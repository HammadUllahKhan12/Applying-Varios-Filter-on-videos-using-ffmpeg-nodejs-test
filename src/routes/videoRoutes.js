const express = require('express');
const upload = require('../middlewares/upload');
const { uploadVideo, getProcessedVideo } = require('../controller/videoController');

const router = express.Router();

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/processed/:filename', getProcessedVideo);

module.exports = router;