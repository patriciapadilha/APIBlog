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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  
  res.status(200).json(result); 
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { data } = req.user;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const result = await postService.updatePost({ id, title, content, userEmail: data });
  
    res.status(200).json(result); 
  } catch (err) {
    const [code, message] = err.message.split('|');

    return res.status(code).json({ message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { data } = req.user;

  try {
    const result = await postService.deletePost({ id, userEmail: data });
    res.status(204).json(result);
  } catch (err) {
    const [code, message] = err.message.split('|');

    return res.status(code).json({ message });
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const result = await postService.searchPost(q);
  res.status(200).json(result);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPost,
};