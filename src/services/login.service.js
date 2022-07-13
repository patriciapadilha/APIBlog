const { User } = require('../database/models');
const jwtService = require('./jwt.service');

const userLogin = async ({ email, password }) => {
  if (!email || !password) {
    return { error: { code: 400, message: 'Some required fields are missing' } };
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { error: { code: 400, message: 'Invalid fields' } };
  }

  const token = jwtService.createToken(email);

  return { sucess: { code: 200, token } };
};

module.exports = {
  userLogin,
};