const Joi = require('joi');
const { User } = require('../database/models');
const jwtMiddlewares = require('../middlewares/jwt');

const validateBody = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'any.required': '400|"displayName" is required',
      'string.min': '400|"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': '400|"email" is required',
      'string.email': '400|"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': '400|"password" is required',
      'string.min': '400|"password" length must be at least 6 characters long',
    }),
    image: Joi.string().required().messages({ 'any.required': '400|"image" is required' }),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
};

const createUser = async ({ displayName, email, password, image }) => {
  validateBody({ displayName, email, password, image });

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new Error('409|User already registered');
  }

  await User.create({ displayName, email, password, image });

  const token = jwtMiddlewares.createToken(email);

  return { sucess: { code: 201, token } };
};

const getAllUsers = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return result;
};

const getUserById = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!result) {
    throw new Error('404|User does not exist');
  }
  return result;
};

const deleteUser = async ({ id, tokenInfos }) => {
  const user = await User.findOne({ where: { email: tokenInfos } });
  
    if (user.id === id) {
      await User.destroy({ where: { id } });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};