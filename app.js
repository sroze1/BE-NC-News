const express = require("express");
const {
  getCommentsForArticle,
} = require("./controllers/commentCount.controllers");
const { getTopics } = require("./controllers/get.controllers");
const { getArticles } = require("./controllers/getArticles.controllers");

const { postComments } = require("./controllers/post.controllers");

const app = express();
app.use(express.json());

// GET
app.get("/api/topics", getTopics);
// app.get("/api/articles/:article_id", getArticles);

// GET /api/articles/:article_id (comment count)
app.get("/api/articles/:article_id", getCommentsForArticle);

app.post("/api/comments/:article_id/comments", postComments);

app.use((err, req, res, next) => {
  const badReqCodes = ["42703"];

  if (badReqCodes.includes(err.code)) {
    res.status(404).send({ msg: "404: Path not found!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "400: Bad Request!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
