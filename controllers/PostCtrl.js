'use strict';

const Rekognition = require('node-rekognition');

const awsConfig = require('../config/aws_config');

const path = require('path');
const dir = path.join(__dirname, 'public');

exports.upload = async(req, res, next) => {
  let result;

  try {
    const params = {
      "accessKeyId": awsConfig.accessKeyId,
      "secretAccessKey": awsConfig.secretAccessKey,
      "region": awsConfig.region,
      "bucket": "musicfacetivall",
      "ACL": "public-read-write" // optional
    };

    const rekognition = new Rekognition(params);


     result = await rekognition.doCall('detectFaces', {
      Image: {
        S3Object: {
          Bucket: req.file.bucket,
          Name: req.file.key
        }
      },
       Attributes: [
         'ALL'
       ]
    });


  } catch (error) {
    return next(error);
  }


  return res.r(`${result.FaceDetails[0].Emotions[0].Type} Song`);
};