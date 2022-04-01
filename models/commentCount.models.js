const db = require("../db/connection");

exports.getCommentsByID = async (article_id) => {
  const column_match = [];

  let joinCommentsCount = `
    SELECT articles.*, CAST(COUNT(comments.article_id) AS INT) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    `;

  if (article_id) {
    joinCommentsCount += `WHERE articles.article_id = $1`;
    column_match.push(article_id);
  }

  joinCommentsCount += "GROUP BY articles.article_id ORDER BY created_at DESC;";

  const joinedTable = await db.query(joinCommentsCount, column_match);

  if (joinedTable.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Article ID does not exist",
    });
  } else return joinedTable.rows[0];
};
