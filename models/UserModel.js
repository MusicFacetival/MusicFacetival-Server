'use strict';

const config = require('../config/config');
const pool = config.pool;


exports.signup = (userData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      INSERT INTO Users(id, pw)
      VALUES (?, ?) ;
      `;

    pool.query(sql, [userData.id, userData.pw], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  })
};

exports.signin = () => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      `;

    pool.query(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
