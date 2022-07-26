const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await categoryService.createCategory(name);
    
        res.status(201).json(result); 
    } catch (err) {
        const [code, message] = err.message.split('|');

       return res.status(code).json({ message });
    }
};

const getAllCategories = async (req, res) => {
    const result = await categoryService.getAllCategories();
    res.status(200).json(result);
};

module.exports = {
    createCategory,
    getAllCategories,
};