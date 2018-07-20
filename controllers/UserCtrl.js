'use strict';

const userModel = require('../models/UserModel');

exports.signup = async (req, res, next) => {

  let result;
  try {


    const userData = {
      id: req.body.id,
      pw: req.body.pw,
      name: req.body.name,
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

    const userData = {
      id: req.body.id,
      pw: req.body.pw
    };

    result = await userModel.signin(userData);

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};