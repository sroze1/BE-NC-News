const db = require("../db/connection");

exports.getUsersModel = () => {
  return db.query(`SELECT * FROM users`).then((results) => {
    return results.rows;
  });
};



