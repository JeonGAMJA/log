const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();
const wrapAsync = require('../middlewares/wrapAsync');

router.route('/register').post(wrapAsync(register));
router.route('/login').post(login);

module.exports = router;
