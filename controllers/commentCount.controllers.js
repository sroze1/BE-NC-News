const { getCommentsByID } = require("../models/commentCount.models");

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;

  getCommentsByID(article_id)
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch((err) => {
      next(err);
    });
};
