import app from "../../app";
import request from "supertest";
import { Document } from "mongoose";

//JAVASCRIPT
import connectDB from "./../../../Database/db/connection";
import seed from "./../../../Database/db/seed/seed";
import testData from "./../../../Database/db/data/test-data";
import mongoose from "mongoose";

beforeAll(() => connectDB());
beforeEach(() => seed(testData));
afterAll(() => {
  mongoose.disconnect();
  console.log("MongoDB disconnected successfully");
});
//JAVASCRIPT

describe("GET getAllEndpoints", () => {
  test("200: /api", () => {
    return request(app).get("/api").expect(200);
  });
});
