import app from "../../app";
import request from "supertest";

describe("GET user", () => {
  test("returns status 200", () => {
    return request(app).get("/users/1").expect(200);
  });
});

describe("POST user", () => {
  test("returns status 201", () => {
    return request(app).post("/users").send({}).expect(201);
  });
});

describe("DELETE user", () => {
  test("return status 204", () => {
    return request(app).delete("/users/1").expect(204);
  });
});

describe("PATCH user", () => {
  test("return status 200", () => {
    return request(app).patch("/users/1").expect(200);
  });
});
