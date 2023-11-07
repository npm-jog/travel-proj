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

describe("GET user", () => {
  test("returns status 200", () => {
    return request(app).get("/users/1").expect(200).then(x => {
        console.log('kkkkkkkkkk')
    })
  });
  /*test("returns status 400", () => {
    return request(app).get("/users/9999").expect(400);
  });*/
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
