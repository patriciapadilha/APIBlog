const { Category } = require('../database/models');

const createCategory = async (name) => {
  if (!name) {
    throw new Error('400|"name" is required');
  }

  const result = await Category.create({ name });

  return result;
};

module.exports = {
    createCategory,
};