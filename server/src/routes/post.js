const express = require('express');
const { addPost } = require('../controllers/postController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.route('/').post(isLoggedIn, addPost);

module.exports = router;
