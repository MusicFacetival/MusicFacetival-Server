'use strict';

const userCtrl = require('../controllers/UserCtrl');
const imageCtrl = require('../controllers/ImageCtrl');
const postCtrl = require('../controllers/PostCtrl');


module.exports = (router) => {

  router.route('/users')
    .post(userCtrl.signup);

  router.route('/users/login')
    .post(userCtrl.signin);

  router.route('/upload')
    .post(imageCtrl.uploadSingle, postCtrl.upload);

  return router;
};