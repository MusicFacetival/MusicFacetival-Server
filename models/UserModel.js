'use strict';

const config = require('../config/config');
const pool = config.pool;

const jwt = require('jsonwebtoken');


exports.signup = (userData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      INSERT INTO Users(id, pw, name)
      VALUES (?, ?, ?) ;
      `;

    pool.query(sql, [userData.id, userData.pw, userData.name], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
    .then((result) => {
      return new Promise((resolve, reject) => {
        const sql =
          `
          SELECT idx, id, name
          FROM Users
          WHERE idx = ?
          `;

        pool.query(sql, result.insertId, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const profile = {
              idx: rows[0].idx,
              id: rows[0].id,
              name: rows[0].name
            };

            const token = jwt.sign(profile, config.jwt.cert, {'expiresIn': "100h"});

            const result = {profile, token};
            resolve(result);
          }
        })
      })
    })
};

exports.signin = (userData) => {
  return new Promise((resolve, reject) => {
      const sql = `SELECT id FROM Users WHERE id = ?`;

      pool.query(sql, [userData.id], (err, rows) => {  // 아이디 존재 검사
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 아이디 없음
            reject(1402);
          } else {
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT idx, id, name
        FROM Users
        WHERE id = ? and pw = ? ;
        `;

      pool.query(sql, [userData.id, userData.pw], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 비밀번호 틀림
            reject(1403);
          } else {
            const profile = {
              idx: rows[0].idx,
              phone: rows[0].id,
              name: rows[0].name
            };
            const token = jwt.sign(profile, config.jwt.cert, {'expiresIn': "100h"});

            const result = {
              profile,
              token
            };
            resolve(result);
          }
        }
      });
    });
  });
};


exports.getSalt = (userData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT salt FROM Users WHERE id = ?
      `;
    pool.query(sql, userData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows);
        if (rows.length === 0) {
          reject(1402);
        } else {
          resolve(rows[0].salt);
        }
      }
    });
  });
};