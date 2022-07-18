const { Sequelize, Op } = require('sequelize');
const Joi = require('joi');
const { BlogPost, Category, User } = require('../database/models');
const config = require('../database/config/config');

const validateBody = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });
  const { error, value } = schema.validate(data);
  if (error) throw new Error('400|Some required fields are missing');
  return value;
};

const validateCategories = async (categories) => {
    const result = await Category.count({
      where: { id: { [Op.in]: categories } },
    });
    return result !== categories.length;
};

const sequelizeConfig = new Sequelize(config.development);

const createPost = async ({ title, content, userEmail, categoryIds }) => {
  validateBody({ title, content, categoryIds });

  const t = await sequelizeConfig.transaction();

  try {
    if (await validateCategories(categoryIds) || categoryIds.length < 1) {
      // throw new Error('400|Some required fields are missing');
      return null;
    }
   
    const user = await User.findOne({ where: { email: userEmail } }, { transaction: t });

    const post = await BlogPost.create({ title, content, userId: user.id }, { transaction: t });
    await t.commit();

    return post;
  } catch (err) {
    await t.rollback();
    return err;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};