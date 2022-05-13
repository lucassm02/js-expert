const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");

const { deepStrictEqual } = require("assert");

describe("API Suite test", () => {
  it("Should request the hello page and return HTTP status 200", async () => {
    const response = await request(app).get("/hello").expect(200);
    deepStrictEqual(response.text, '{"message":"hello word!"}');
  });

  it("Should return HTTP 404 status for non-existent pages", async () => {
    const response = await request(app).get("/any-page").expect(404);
    deepStrictEqual(response.text, '{"message":"Not found"}');
  });

  it("Should login successfully on the login route and return Http status 200", async () => {
    const response = await request(app).post("/login").expect(200);
    deepStrictEqual(response.text, '{"message":"Login successfully!"}');
  });
});
