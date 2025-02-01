const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

exports.register = async (req, res, dbConnection) => {
    try {
        console.log('Register request received:', req.body);
        const hashedPassword = hashPassword(req.body.password);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        };
        await dbConnection.query('INSERT INTO users SET ?', user);
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res, dbConnection, secrets) => {
    try {
        console.log('Login request received:', req.body);
        const [results] = await dbConnection.query('SELECT * FROM users WHERE username = ?', [req.body.username]);
        const user = results[0];
        if (!user) {
            console.log('User not found');
            return res.status(404).send({ message: 'User not found' });
        }

        const hashedPassword = hashPassword(req.body.password);
        console.log('hashedPassword', hashedPassword);
        if (hashedPassword !== user.password) {
            console.log('Invalid password');
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, secrets.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Error logging in', error });
    }
};

exports.findUserIdByUsername = async (req, res, dbConnection) => {
    try {
        console.log('Going to get userid by username -- ', req.params.username);
        const [results] = await dbConnection.query('SELECT id FROM users WHERE username = ?', [req.params.username]);
        if (results.length === 0) {
            console.log('User not found:', req.params.username);
            return res.status(404).send({ message: 'User not found' });
        }
        const userId = results[0];
        res.status(200).send(userId);
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send({ message: 'Error finding user', error });
    }
};