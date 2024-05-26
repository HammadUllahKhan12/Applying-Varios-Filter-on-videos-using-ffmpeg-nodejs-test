const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const { PROCESSED_DIR, JOB_EXPIRATION } = process.env;

const applyEffect = (command, effect) => {
    switch (effect) {
        case 'grayscale':
            return command.videoFilters('hue=s=0');
        case 'negate':
            return command.videoFilters('lutrgb=r=negval:g=negval:b=negval');
        case 'sepia':
            return command.videoFilters('colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131');
        case 'blur':
            return command.videoFilters('boxblur=5:1');
        case 'sharpen':
            return command.videoFilters('unsharp=7:7:1.0:7:7:0.0');
        default:
            return command;
    }
};

const processVideo = (filePath, effect, dimensions) => {
    const outputFileName = `${Date.now()}_processed.mp4`;
    const outputFilePath = path.join(PROCESSED_DIR, outputFileName);

    return new Promise((resolve, reject) => {
        let command = ffmpeg(filePath);

        command = applyEffect(command, effect);

        if (dimensions) {
            const [width, height] = dimensions.split('x');
            command.size(`${width}x${height}`);
        }

        command
            .on('end', () => resolve(outputFilePath))
            .on('error', (err) => reject(err))
            .save(outputFilePath);
    });
};

const cleanup = (filePath) => {
    setTimeout(() => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }, JOB_EXPIRATION * 1000);
};

module.exports = { processVideo, cleanup };