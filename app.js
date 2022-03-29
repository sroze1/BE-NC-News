const express = require("express");
const { getTopics } = require("./controllers/get.controllers");
const { getArticles } = require("./controllers/getArticles.controllers");

const { postComments } = require("./controllers/post.controllers");

const app = express();
app.use(express.json());

// GET
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);

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
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;

// GET /api/articles/:article_id
// Responds with:

// - an article object, which should have the following properties:

//   - `author` which is the `username` from the users table
//   - `title`
//   - `article_id`
//   - `body`
//   - `topic`
//   - `created_at`
//   - `votes`
