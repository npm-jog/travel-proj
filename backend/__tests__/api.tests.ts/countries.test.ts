import app from "../../app";
import request from "supertest";
import { CountryType } from "../../interfaces/response.interfaces";

import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose from "mongoose";

beforeAll(() => connectDB());
beforeEach(() => seed(testData));
afterAll(() => {
  mongoose.disconnect();
});

describe("GET fetchAllCountries", () => {
  test("200: /api/countries", () => {
    return request(app)
      .get("/api/countries")
      .expect(200)
      .then(({ body }) => {
        const countries: CountryType[] = body.countries;
        expect(countries).toHaveLength(18);
        countries.forEach((country: CountryType) => {
          expect(country).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              coordinates: expect.any(Object),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
  test("404: should handle accessing a non-existent route under /api/countries", () => {
    return request(app).get("/api/countries/non_existent_route").expect(404);
  });
});
