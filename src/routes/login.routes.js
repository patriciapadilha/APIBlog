const express = require('express');

const router = express.Router();
const userController = require('../controllers/login.controller');

router.post('/', userController.userLogin);

module.exports = router;