#!/bin/bash

# Stack names
MONITORING_STACK="BloggingApp-Monitoring"
FRONTEND_STACK="BloggingApp-Frontend"
BACKEND_STACK="BloggingApp-Backend"
DATABASE_STACK="BloggingApp-Database"
NETWORK_STACK="BloggingApp-Network"

# Function to wait for stack deletion
wait_for_stack_deletion() {
  STACK_NAME=$1
  echo "Waiting for stack $STACK_NAME to be deleted..."
  aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME
  echo "Stack $STACK_NAME has been deleted."
}

# Delete Monitoring Stack
echo "Deleting Monitoring Stack..."
aws cloudformation delete-stack --stack-name $MONITORING_STACK
wait_for_stack_deletion $MONITORING_STACK

# Delete Frontend Stack
echo "Deleting Frontend Stack..."
aws cloudformation delete-stack --stack-name $FRONTEND_STACK
wait_for_stack_deletion $FRONTEND_STACK

# Delete Backend Stack
echo "Deleting Backend Stack..."
aws cloudformation delete-stack --stack-name $BACKEND_STACK
wait_for_stack_deletion $BACKEND_STACK

# Delete Database Stack
echo "Deleting Database Stack..."
aws cloudformation delete-stack --stack-name $DATABASE_STACK
wait_for_stack_deletion $DATABASE_STACK

# Delete Network Stack
echo "Deleting Network Stack..."
aws cloudformation delete-stack --stack-name $NETWORK_STACK
wait_for_stack_deletion $NETWORK_STACK

echo "All stacks have been deleted successfully."
