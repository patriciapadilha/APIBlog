const { User } = require('../database/models');
const jwtMiddlewares = require('../middlewares/jwt');

const userLogin = async ({ email, password }) => {
  if (!email || !password) {
    return { error: { code: 400, message: 'Some required fields are missing' } };
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { error: { code: 400, message: 'Invalid fields' } };
  }

  const token = jwtMiddlewares.createToken(email);

  return { sucess: { code: 200, token } };
};

module.exports = {
  userLogin,
};