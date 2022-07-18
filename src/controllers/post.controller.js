const postService = require('../services/post.service');
const { PostCategory } = require('../database/models');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { data } = req.user;

    try {
      const result = await postService.createPost({ title, content, userEmail: data, categoryIds });
      if (!result) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
      await Promise.all(categoryIds
        .map((id) => PostCategory.create({ postId: result.dataValues.id, categoryId: id })));
      
      res.status(201).json(result);  
    } catch (err) {
      const [code, message] = err.message.split('|');
  
      return res.status(code).json({ message });
    }
};

const getAllPosts = async (req, res) => {
  const results = await postService.getAllPosts();
  
  res.status(200).json(results); 
};

module.exports = {
    createPost,
    getAllPosts,
};