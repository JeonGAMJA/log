const cookieToken = require('../../utils/cookieToken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nickname, email, password } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).json({
      message: 'Name, email and password are required',
    });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  user = await User.create({
    nickname,
    email,
    password,
  });

  cookieToken(user, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }

  cookieToken(user, res);
};
