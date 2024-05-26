const Bull = require('bull');
const { REDIS_URL } = process.env;

const videoQueue = new Bull('video-processing', REDIS_URL);

module.exports = videoQueue;