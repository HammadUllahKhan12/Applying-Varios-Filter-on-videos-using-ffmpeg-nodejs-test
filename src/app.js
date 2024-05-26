const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const videoQueue = require('./queue');
const videoJobProcessor = require('./jobs/videoJobProcessor');
const path = require('path');
const { UPLOAD_DIR, PROCESSED_DIR } = process.env;

const app = express();

app.use(express.json());
app.use('/videos', videoRoutes);
app.use('/processed', express.static(path.join(__dirname, '..', PROCESSED_DIR)));

videoQueue.process(videoJobProcessor);

module.exports = app;
