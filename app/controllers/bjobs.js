const response = require('../config/response');
const fs = require('fs');
var path = require('path');
const AWS = require('aws-sdk');
var moveFrom = "/Users/ravikumar/Documents/ecom/app/uploads";


const ID = 'AWS_S3_ID_XXXXXXXX';
const SECRET = 'AWS_S3_SECRET_XXXXXXXX';

const BUCKET_NAME = 'AWS_S3_test-bucket';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFiles = async (req,res) => {

      fs.readdir(moveFrom, function(err, files) {
          if (!fs.readdirSync(moveFrom).length === 0) {
              files.forEach(function (file, index) {
                
                var fromPath = path.join(moveFrom, file);
            
                fs.stat(fromPath, function (error, stat) {
                  if (error) {
                    response.failed("Something went wrong. Please try again ", res)
                  }
                  var newName = Date.now()+'_'+fromPath.name;
                  var fileContent = fs.readFileSync(fromPath);
                  var params = {
                      Bucket: BUCKET_NAME,
                      Key: newName, 
                      Body: fileContent
                  };
                  var uploadData = s3.upload(params);
                  Console.log('File uploaded to' + uploadData.Location);
                  
                });
              });
            
          } else {
            response.failed("No files available to upload ", res)
          }
      });
}


module.exports = {
  uploadFiles
};
