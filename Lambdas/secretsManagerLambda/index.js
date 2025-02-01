const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

exports.handler = async (event) => {
  const secretsManagerClient = new SecretsManagerClient({ region: 'us-east-1' });
  const secretName = 'BloggingPlatformSecrets';
  const command = new GetSecretValueCommand({ SecretId: secretName });

  try {
    const data = await secretsManagerClient.send(command);
    if ('SecretString' in data) {
      const secrets = JSON.parse(data.SecretString);
      return {
        statusCode: 200,
        body: JSON.stringify(secrets),
      };
    } else {
      throw new Error('SecretString not found in the response');
    }
  } catch (err) {
    console.error('Error retrieving secrets from Secrets Manager:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve secrets' }),
    };
  }
};
