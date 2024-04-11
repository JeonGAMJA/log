const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ dest: 'tmp' });

router.post('/upload', upload.array('contents', 3), async (req, res) => {
  try {
    let contentArray = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[index];
      const result = await cloudinary.uploader.upload(path, {
        folder: 'Log/Posts',
      });

      contentArray.push(result.secure_url);
    }

    res.status(200).json(contentArray);
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.use('/user', require('./user'));
router.use('/post', require('./post'));

module.exports = router;
