const db = require("../db/connection");

exports.getArticlesModel = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      throw error;
    });
};

