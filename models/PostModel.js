'use strict';

const config = require('../config/config');
const pool = config.pool;

exports.upload = (data) => {
  return new Promise((resolve, reject) => {
    const sql = ``;

    pool.query(sql, data, (err, rows) => {

    })

  })
};
