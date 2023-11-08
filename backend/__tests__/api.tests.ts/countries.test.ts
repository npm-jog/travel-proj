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

describe("GET fetchAllCountries", () => {
  test("200: /api/countries", () => {
    return request(app)
      .get("/api/countries")
      .expect(200)
      .then(({ body: { countries } }) => {
        console.log(countries);
        expect(countries).toHaveLength(18);
        countries.forEach((country: Document) => {
          expect(country).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
});
