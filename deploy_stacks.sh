#!/bin/bash

# Set AWS region
AWS_REGION="us-east-1"

# Stack names
NETWORK_STACK="BloggingApp-Network"
DATABASE_STACK="BloggingApp-Database"
BACKEND_STACK="BloggingApp-Backend"
FRONTEND_STACK="BloggingApp-Frontend"
MONITORING_STACK="BloggingApp-Monitoring"

# Template file paths
NETWORK_TEMPLATE="network.yaml"
DATABASE_TEMPLATE="database.yaml"
BACKEND_TEMPLATE="backend.yaml"
FRONTEND_TEMPLATE="frontend.yaml"
MONITORING_TEMPLATE="monitoring.yaml"

# Function to wait for stack completion
wait_for_stack() {
  STACK_NAME=$1
  echo "Waiting for stack $STACK_NAME to reach CREATE_COMPLETE status..."
  aws cloudformation wait stack-create-complete --stack-name $STACK_NAME
  echo "Stack $STACK_NAME has been created."
}

# Deploy Network Stack
echo "Deploying Network Stack..."
aws cloudformation create-stack \
  --stack-name $NETWORK_STACK \
  --template-body file://$NETWORK_TEMPLATE \
  --capabilities CAPABILITY_NAMED_IAM

wait_for_stack $NETWORK_STACK

# Retrieve Outputs from Network Stack
echo "Retrieving outputs from Network Stack..."
BloggingAppVPC=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='BloggingAppVPC'].OutputValue" --output text)
BackendALBSecurityGroupId=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='BackendALBSecurityGroupId'].OutputValue" --output text)
FrontendALBSecurityGroupId=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='FrontendALBSecurityGroupId'].OutputValue" --output text)
BloggingAppRDSSecurityGroup=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='RDSSecurityGroup'].OutputValue" --output text)
BACKEND_SECURITY_GROUP=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='BackendSecurityGroupId'].OutputValue" --output text)
FRONTEND_SECURITY_GROUP=$(aws cloudformation describe-stacks --stack-name $NETWORK_STACK --query "Stacks[0].Outputs[?OutputKey=='FrontendSecurityGroupId'].OutputValue" --output text)

# Deploy Database Stack
echo "Deploying Database Stack..."
aws cloudformation create-stack \
  --stack-name $DATABASE_STACK \
  --template-body file://$DATABASE_TEMPLATE \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    ParameterKey=DBName,ParameterValue=bloggingapp 

wait_for_stack $DATABASE_STACK

# Retrieve Outputs from Database Stack
echo "Retrieving outputs from Database Stack..."
BloggingPlatformSecretsArn=$(aws cloudformation describe-stacks --stack-name $DATABASE_STACK --query "Stacks[0].Outputs[?OutputKey=='BloggingPlatformSecretsArn'].OutputValue" --output text)
DB_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $DATABASE_STACK --query "Stacks[0].Outputs[?OutputKey=='RDSInstanceEndpoint'].OutputValue" --output text)

# Deploy Backend Stack
echo "Deploying Backend Stack..."
aws cloudformation create-stack \
  --stack-name $BACKEND_STACK \
  --template-body file://$BACKEND_TEMPLATE \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    ParameterKey=KeyPairName,ParameterValue=newkey \
    ParameterKey=InstanceType,ParameterValue=t3.micro \
    ParameterKey=BackendSecurityGroup,ParameterValue=$BACKEND_SECURITY_GROUP \
    ParameterKey=BackendALBSecurityGroupId,ParameterValue=$BackendALBSecurityGroupId \
    ParameterKey=DBInstanceEndpoint,ParameterValue=$DB_ENDPOINT

wait_for_stack $BACKEND_STACK

# Retrieve Outputs from Backend Stack
echo "Retrieving outputs from Backend Stack..."
BloggingSNSTopicArn=$(aws cloudformation describe-stacks --stack-name $BACKEND_STACK --query "Stacks[0].Outputs[?OutputKey=='BloggingSNSTopicArn'].OutputValue" --output text)
BackendAutoScalingGroupName=$(aws cloudformation describe-stacks --stack-name $BACKEND_STACK --query "Stacks[0].Outputs[?OutputKey=='BackendAutoScalingGroupName'].OutputValue" --output text)
BACKEND_ALB_DNS=$(aws cloudformation describe-stacks --stack-name $BACKEND_STACK --query "Stacks[0].Outputs[?OutputKey=='BackendLoadBalancerDNSName'].OutputValue" --output text)

# Deploy Frontend Stack
echo "Deploying Frontend Stack..."
aws cloudformation create-stack \
  --stack-name $FRONTEND_STACK \
  --template-body file://$FRONTEND_TEMPLATE \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    ParameterKey=KeyPairName,ParameterValue=newkey \
    ParameterKey=NotificationApiEndpoint,ParameterValue=$BloggingSNSTopicArn \
    ParameterKey=FrontendSecurityGroup,ParameterValue=$FRONTEND_SECURITY_GROUP \
    ParameterKey=FrontendALBSecurityGroup,ParameterValue=$FrontendALBSecurityGroupId \
    ParameterKey=BackendALBDNSName,ParameterValue=$BACKEND_ALB_DNS  

wait_for_stack $FRONTEND_STACK

# Retrieve Outputs from Frontend Stack
echo "Retrieving outputs from Frontend Stack..."
FRONTEND_ALB_DNS=$(aws cloudformation describe-stacks --stack-name $FRONTEND_STACK --query "Stacks[0].Outputs[?OutputKey=='FrontendLoadBalancerDNSName'].OutputValue" --output text)
FrontendAutoScalingGroupName=$(aws cloudformation describe-stacks --stack-name $FRONTEND_STACK --query "Stacks[0].Outputs[?OutputKey=='FrontendAutoScalingGroupName'].OutputValue" --output text)

# Deploy Monitoring Stack
#echo "Deploying Monitoring Stack..."
#aws cloudformation create-stack \
#  --stack-name $MONITORING_STACK \
#  --template-body file://$MONITORING_TEMPLATE \
#  --capabilities CAPABILITY_NAMED_IAM \
#  --parameters \
#    ParameterKey=AlarmEmail,ParameterValue=iamtherockstar05@gmail.com

#wait_for_stack $MONITORING_STACK

echo "All stacks have been deployed successfully."
echo "Frontend URL: http://$FRONTEND_ALB_DNS"
