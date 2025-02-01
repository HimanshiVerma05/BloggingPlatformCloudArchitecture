const postModel = require('../models/postModel');

exports.createPost = async (req, res, dbConnection) => {
    try {
        console.log('Create post request received:', req.body);
        const post = {
            user_id: req.body.user_id,
            title: req.body.title,
            content: req.body.content
        };
        await dbConnection.query('INSERT INTO posts SET ?', post);
        res.status(201).send({ message: 'Post created successfully!' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send({ message: 'Error creating post', error });
    }
};

exports.getAllPosts = async (req, res, dbConnection) => {
    try {
        console.log('Get all posts request received');
        const [results] = await dbConnection.query('SELECT * FROM posts');
        res.status(200).send(results);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).send({ message: 'Error retrieving posts', error });
    }
};

exports.getPostById = async (req, res, dbConnection) => {
    try {
        console.log('Get post by ID request received:', req.params.id);
        const [results] = await dbConnection.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        const post = results[0];
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error('Error retrieving post:', error);
        res.status(500).send({ message: 'Error retrieving post', error });
    }
};

exports.updatePostById = async (req, res, dbConnection) => {
    try {
        console.log('Update post by ID request received:', req.params.id);
        const updatedPost = {
            title: req.body.title,
            content: req.body.content
        };
        const [results] = await dbConnection.query('UPDATE posts SET ? WHERE id = ?', [updatedPost, req.params.id]);
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send({ message: 'Post updated successfully!' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send({ message: 'Error updating post', error });
    }
};

exports.deletePostById = async (req, res, dbConnection) => {
    try {
        console.log('Delete post by ID request received:', req.params.id);
        const [results] = await dbConnection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send({ message: 'Post deleted successfully!' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Error deleting post', error });
    }
};
