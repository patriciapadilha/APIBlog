const express = require('express');
const jwt = require('../middlewares/jwt');

const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/', jwt.validateToken, categoryController.getAllCategories);
router.post('/', jwt.validateToken, categoryController.createCategory);

module.exports = router;