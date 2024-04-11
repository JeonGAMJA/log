const Post = require('../models/Post');

exports.addPost = async (req, res) => {
  try {
    const userData = req.user;

    const { title, addedContent, thumbnail, weather, feeling, createdAt, updatedAt } =
      req.body;

    const post = await Post.create({
      title,
      addedContent,
      thumbnail,
      weather,
      feeling,
      createdAt,
      updatedAt,
    });
  } catch (err) {}
};
