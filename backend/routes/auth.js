const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const getSecrets = require('../services/secretsManager');

module.exports = (dbConnection) => {
    // Register route
    router.post('/register', async (req, res) => {
        try {
            console.log('Register request received:', req.body);
            await authController.register(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling register request:', error);
            res.status(500).send({ message: 'Error handling register request', error });
        }
    });

    // Login route
    router.post('/login', async (req, res) => {
        try {
            console.log('Login request received:', req.body);
            const secrets = await getSecrets();
            await authController.login(req, res, dbConnection, secrets);
        } catch (error) {
            console.error('Error handling login request:', error);
            res.status(500).send({ message: 'Error handling login request', error });
        }
    });

   // Find userId by username route
   router.get('/user/:username', async (req, res) => {
    try {
        console.log('trying to get userid by username');
      await authController.findUserIdByUsername(req, res, dbConnection);
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).send({ message: 'Error finding user', error });
    }
  });

    return router;
};
