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

describe("GET getWishlistByUserId", () => {
  test("200: /api/wishlist/:user_id", () => {
    return request(app)
      .get("/api/wishlist/1")
      .expect(200)
      .then((x) => {});
  });
});

describe("POST postLocationByUserId", () => {
  test("201: /api/wishlist/:user_id", () => {
    return request(app).post("/api/wishlist/1").send({}).expect(201);
  });
});

describe("DELETE deleteLocationByCountryName", () => {
  test("204: /api/wishlist/:user_id/:country_name", () => {
    return request(app).delete("/api/wishlist/Italy").expect(204);
  });
});
