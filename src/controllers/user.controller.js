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

const getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  return res.status(200).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await userService.getUserById(id);

    return res.status(200).json(result);
  } catch (err) {
    const [code, message] = err.message.split('|');

    return res.status(code).json({ message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.user;

  const result = await userService.deleteUser({ id, tokenInfos: data });

  res.status(204).json(result);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};