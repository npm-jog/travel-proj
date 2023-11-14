import app from "../../app";
import request from "supertest";

describe("GET getAllEndpoints", () => {
  test("200: /api", () => {
    return request(app).get("/api").expect(200);
  });
});
