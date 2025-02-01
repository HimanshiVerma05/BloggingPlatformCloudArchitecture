import json
import boto3
import os
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

sns_client = boto3.client('sns')

notification_topic_arn = os.environ['SNS_TOPIC_ARN']
region_name = os.environ['AWS_REGION']

def send_notification(subject, message):
    sns_client.publish(
        TopicArn=notification_topic_arn,
        Message=message,
        Subject=subject
    )
    logger.info(f"Notification sent with subject: {subject}")

def subscribe_user_email(email):
    try:
        response = sns_client.subscribe(
            TopicArn=notification_topic_arn,
            Protocol='email',
            Endpoint=email,
            ReturnSubscriptionArn=True
        )
        logger.info(f"Subscribed {email} to SNS topic {notification_topic_arn}")
        return response['SubscriptionArn']
    except Exception as e:
        logger.error(f"Error subscribing email {email} to SNS topic: {e}")
        raise e

def lambda_handler(event, context):
    logger.info("Received event: %s", json.dumps(event))

    user_email = event.get('user_email')
    message = event.get('message', 'A new blog post has been created.')

    if user_email:
        logger.info(f"Subscribing user email: {user_email}")
        try:
            subscribe_user_email(user_email)
        except Exception as e:
            logger.error(f"Error subscribing user email: {e}")
		 
											 
            return {
                'statusCode': 500,
                'body': json.dumps('Error subscribing user email')
            }

    try:
        send_notification('Blog Post Notification', message)
        return {
            'statusCode': 200,
            'body': json.dumps('Notification sent successfully')
        }
    except Exception as e:
        logger.error(f"Error sending notification: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error sending notification')
        }
