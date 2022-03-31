const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("GET /api/articles/:article_id returns new column of comment count", () => {
  test("article with relevant ID is returned ", async () => {
    const results = await request(app).get("/api/articles/3").expect(200);
    expect(results.body.results.comment_count).toBe(2);
  });
  test("Matches keys length in the correct format", async () => {
    const results = await request(app).get("/api/articles/3").expect(200);
    expect(results.body.results).toEqual({
      article_id: expect.any(Number),
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: expect.any(Number),
    });
  });
  test("gets 404 for incorrect path", () => {
    return request(app)
      .get("/api/articlese3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });
  });
  test("gets 400 for bad request", () => {
    return request(app)
      .get("/api/articles/3u")
      .expect(400)
      .then((results) => {
        expect(results.status).toBe(400);
      });
  });
});
