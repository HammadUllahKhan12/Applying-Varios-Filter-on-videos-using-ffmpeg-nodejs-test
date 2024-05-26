const videoQueue = require('../queue');
const path = require('path');
const fs = require('fs');
const { PROCESSED_DIR, JOB_EXPIRATION } = process.env;

const uploadVideo = (req, res) => {
    const { effect, dimensions } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const job = videoQueue.add({ fileName: file.filename, effect, dimensions });

    job.on('progress', (progress) => {
        console.log(`Job progress: ${progress}%`);
    });

    job.on('completed', (result) => {
        console.log(`Job completed with result: ${result}`);
    });

    res.status(202).send({ jobId: job.id });
};

const getProcessedVideo = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(PROCESSED_DIR, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).send('Error downloading file.');
            } else {
                setTimeout(() => {
                    fs.unlinkSync(filePath);
                }, JOB_EXPIRATION * 1000);
            }
        });
    } else {
        res.status(404).send('File not found.');
    }
};

module.exports = { uploadVideo, getProcessedVideo };
