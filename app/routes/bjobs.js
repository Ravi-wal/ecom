const bjobs = require('../controllers/bjobs');

module.exports = app => {
    app.get("/arena/UploadFilesToAmazonS3/jobs", bjobs.uploadFiles);
};