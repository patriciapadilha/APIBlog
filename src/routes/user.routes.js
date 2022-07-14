const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', jwt.validateToken, userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;