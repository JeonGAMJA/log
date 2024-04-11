const express = require('express');
const { register } = require('../controllers/userController');
const router = express.Router();
const wrapAsync = require('../middlewares/wrapAsync');

router.route('/register').post(wrapAsync(register));

module.exports = router;
