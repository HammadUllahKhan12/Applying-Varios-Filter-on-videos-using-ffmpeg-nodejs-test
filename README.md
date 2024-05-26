Applying-Varios-Filter-on-videos-using-ffmpeg-nodejs

# example env

- PORT=3000
- REDIS_URL=redis://127.0.0.1:6379
- UPLOAD_DIR=uploads
- PROCESSED_DIR=processed
- JOB_EXPIRATION=3600

# commands to run the app
- npm install
- npm start


# Routes
- Routes are /upload to upload the file.
- /processed/:filename to get the processed file vides after applying filter.
