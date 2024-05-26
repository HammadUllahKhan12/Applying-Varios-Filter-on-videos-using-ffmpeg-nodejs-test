const { processVideo, cleanup } = require('../services/videoService');
const path = require('path');
const { UPLOAD_DIR } = process.env;

const videoJobProcessor = async (job, done) => {
    try {
        const { fileName, effect, dimensions } = job.data;
        const filePath = path.join(UPLOAD_DIR, fileName);

        const processedFilePath = await processVideo(filePath, effect, dimensions);
        cleanup(filePath);
        job.progress(100);

        done(null, { downloadLink: `/processed/${path.basename(processedFilePath)}` });
    } catch (error) {
        done(error);
    }
};

module.exports = videoJobProcessor;