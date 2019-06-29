const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

const aws = require('aws-sdk'); 
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: process.env.key,
  secretAccessKey: process.env.secret,
})

const S3_BUCKET = 'job-application-tracker';
//get route

app.get('/api/hello', (req, res) => {
  res.send('hello');
})
// Now lets export this function so we can call it from somewhere else
app.post('/api/s3',(req,res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
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
// Make a request to the S3 API to get a signed URL which we can use to upload our file
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

app.listen(PORT, () => {
    console.log('on port', PORT);
})