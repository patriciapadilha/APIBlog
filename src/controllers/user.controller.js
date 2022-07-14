const userService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(result.sucess.code).json({ token: result.sucess.token }); 
  } catch (err) {
    const [code, message] = err.message.split('|');
    
    return res.status(code).json({ message });
  }
};

module.exports = {
    createUser,
};