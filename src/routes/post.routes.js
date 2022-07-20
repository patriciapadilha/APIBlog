const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/search', jwt.validateToken, postController.searchPost);
router.get('/:id', jwt.validateToken, postController.getPostById);
router.get('/', jwt.validateToken, postController.getAllPosts);
router.post('/', jwt.validateToken, postController.createPost);
router.put('/:id', jwt.validateToken, postController.updatePost);
router.delete('/:id', jwt.validateToken, postController.deletePost);

module.exports = router;