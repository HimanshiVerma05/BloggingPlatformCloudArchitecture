const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const secretsManagerClient = new SecretsManagerClient({
    region: process.env.REGION || 'us-east-1'
});

const getSecretsFromLambda = async () => {
    const secretName = 'BloggingPlatformSecrets';
    console.log('getsecretsfromlambda');
    const command = new GetSecretValueCommand({ SecretId: secretName });

    try {
        console.log('before  secretsmanagerclient call');
        const data = await secretsManagerClient.send(command);
        console.log('after secretsmanagerclient call');
        if ('SecretString' in data) {
            const secrets = JSON.parse(data.SecretString);
            return secrets;
        } else {
            throw new Error('SecretString not found in the response');
        }
    } catch (err) {
        console.error('Error retrieving secrets from Secrets Manager:', err);
        throw err;
    }
};

module.exports = getSecretsFromLambda;
