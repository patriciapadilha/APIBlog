const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/:id', jwt.validateToken, postController.getPostById);
router.get('/', jwt.validateToken, postController.getAllPosts);
router.post('/', jwt.validateToken, postController.createPost);
router.put('/:id', jwt.validateToken, postController.updatePost);

module.exports = router;