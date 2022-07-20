const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.delete('/me', jwt.validateToken, userController.deleteUser);
router.get('/:id', jwt.validateToken, userController.getUserById);
router.get('/', jwt.validateToken, userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;