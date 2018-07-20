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
      "bucket": "musicfacetival",
      "ACL": "public-read" // optional
    };

    const rekognition = new Rekognition(params);

    console.log(req.file);
    const imagePaths = req.file;
    // const imagePaths = `${dir}/yeri.jpg`;
    const folder = req.file.bucket;

    // const s3Images = await rekognition.uploadToS3(imagePaths, folder);
    const s3Images = await rekognition.detectFaces(imagePaths);

    console.log('s3', s3Images);

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};