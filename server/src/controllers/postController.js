const Post = require('../models/Post');

exports.addPost = async (req, res) => {
  try {
    const userData = req.user;

    const { title, addedContent, thumbnail, weather, feeling, createdAt, updatedAt } =
      req.body;

    const post = await Post.create({
      owner: userData.id,
      title,
      content: addedContent,
      thumbnail,
      weather,
      feeling,
      createdAt,
      updatedAt,
    });
    res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Sever Error',
    });
  }
};
