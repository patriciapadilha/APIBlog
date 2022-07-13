const loginService = require('../services/login.service');

const userLogin = async (req, res) => {
  const result = await loginService.userLogin(req.body);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }
  
  res.status(result.sucess.code).json({ token: result.sucess.token }); 
};

module.exports = {
  userLogin,
};