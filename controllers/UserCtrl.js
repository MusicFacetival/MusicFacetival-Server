'use strict';

const userModel = require('../models/UserModel');

const config = require('../config/config');

exports.signup = async (req, res, next) => {

  let result;
  try {

    const pw = config.doCipher(req.body.pw);

    const userData = {
      id: req.body.id,
      pw: pw
    };

    result = await userModel.signup(userData);

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};


exports.signin = async (req, res, next) => {

  let result;

  try {

    result = await userModel.signin();

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};