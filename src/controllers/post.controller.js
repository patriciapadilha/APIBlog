const postService = require('../services/post.service');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { data } = req.user;

    try {
      const result = await postService.createPost({ title, content, userEmail: data, categoryIds });
      if (!result) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
      
      res.status(201).json(result);  
    } catch (err) {
      const [code, message] = err.message.split('|');
  
      return res.status(code).json({ message });
    }
};

module.exports = {
    createPost,
};