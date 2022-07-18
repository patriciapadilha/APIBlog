const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/', jwt.validateToken, postController.getAllPosts);
router.post('/', jwt.validateToken, postController.createPost);

module.exports = router;