const express = require('express');
const router = express.Router();
//aws-sdk
const aws = require('aws-sdk'); 

//env
require('dotenv').config(); // Configure dotenv to load in the .env file

//get
router.get('/', (req, res) => {
    res.send('hello');
  })

// aws configuration with accessKeyId and secretAccessKey
aws.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.key,
  secretAccessKey: process.env.secret,
})
//define bucket
const S3_BUCKET = 'job-application-tracker';

//post route
router.post('/',(req,res) => {
    // Create a new instance of S3
    const s3 = new aws.S3();  
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read',
    };
  // request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log('put error');
        console.log(err);
        res.json({success: false, error: err})
      }
// Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
  const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      // Send it all back
      res.json({success:true, data:{returnData}});
    });
  })

  module.exports = router;