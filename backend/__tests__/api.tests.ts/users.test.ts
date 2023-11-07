import app from "../../app";
import request from "supertest";

//JAVASCRIPT
import connectDB from "./../../../Database/db/connection";
import seed from "./../../../Database/db/seed/seed";
import testData from "./../../../Database/db/data/test-data";
import mongoose from "mongoose";

/*beforeAll(() => connectDB());
beforeEach(() => seed(testData));
afterAll(() => {
  mongoose.disconnect();
  console.log("MongoDB disconnected successfully");
});*/
//JAVASCRIPT

describe("GET fetchUserById", () => {
  test("200: /api/users/:user_id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then((x) => {});
  });
  /*test("returns status 400", () => {
    return request(app).get("/users/9999").expect(400);
  });*/
});

describe("POST createUser", () => {
  test("201: /api/users", () => {
    return request(app).post("/api/users").send({}).expect(201);
  });
});

describe("DELETE removeUserById", () => {
  test("204: /api/users/:user_id", () => {
    return request(app).delete("/api/users/1").expect(204);
  });
});

describe("PATCH updateUserById", () => {
  test("200: /api/users/:user_id", () => {
    return request(app).patch("/users/1").expect(200);
  });
});
