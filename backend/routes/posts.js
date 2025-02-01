const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

module.exports = (dbConnection) => {
    // Create post route
    router.post('/', async (req, res) => {
        try {
            console.log('Create post request received:', req.body);
            await postController.createPost(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling create post request:', error);
            res.status(500).send({ message: 'Error handling create post request', error });
        }
    });

    // Get all posts route
    router.get('/', async (req, res) => {
        try {
            console.log('Get all posts request received');
            await postController.getAllPosts(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling get all posts request:', error);
            res.status(500).send({ message: 'Error handling get all posts request', error });
        }
    });

    // Get post by ID route
    router.get('/:id', async (req, res) => {
        try {
            console.log('Get post by ID request received:', req.params.id);
            await postController.getPostById(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling get post by ID request:', error);
            res.status(500).send({ message: 'Error handling get post by ID request', error });
        }
    });

    // Update post by ID route
    router.put('/:id', async (req, res) => {
        try {
            console.log('Update post by ID request received:', req.params.id);
            await postController.updatePostById(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling update post by ID request:', error);
            res.status(500).send({ message: 'Error handling update post by ID request', error });
        }
    });

    // Delete post by ID route
    router.delete('/:id', async (req, res) => {
        try {
            console.log('Delete post by ID request received:', req.params.id);
            await postController.deletePostById(req, res, dbConnection);
        } catch (error) {
            console.error('Error handling delete post by ID request:', error);
            res.status(500).send({ message: 'Error handling delete post by ID request', error });
        }
    });

    return router;
};
