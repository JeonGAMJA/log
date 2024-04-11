const jwt = require('jsonwebtoken');
exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization').replace('Bearer', '');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Loginfirst to do this',
    });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};
