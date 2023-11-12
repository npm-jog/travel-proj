import app from "../../app";
import request from "supertest";
import { PublicHolidays, WeatherData, SafetyData } from "../../types/types";

describe("GET /api/public_holidays/:year/:country_code", () => {
  test("200: Returns status 200 and requested public holidays for the country in that year", () => {
    return request(app)
      .get("/api/country_data/public_holidays?year=2023&country_code=AT")
      .expect(200)
      .then(({ body }) => {
        const publicHolidays: PublicHolidays[] = body.publicHolidays;
        publicHolidays.forEach((publicHoliday: PublicHolidays) => {
          expect(publicHoliday).toEqual(
            expect.objectContaining({
              date: expect.any(String),
              localName: expect.any(String),
              name: expect.any(String),
              countryCode: expect.any(String),
              fixed: expect.any(Boolean),
              global: expect.any(Boolean),
              types: expect.any(Array),
            })
          );
        });
      });
  });
  test("400: Returns status 400 for invalid year", () => {
    return request(app)
      .get("/api/country_data/public_holidays?year=invalid_year&country_code=AT")
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Bad query request");
      });
  });
  test("400: Returns status 400 for invalid country code", () => {
    return request(app)
      .get("/api/country_data/public_holidays?year=2023&country_code=ZG")
      .expect(404)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid country code");
      });
  });
  test("400: Returns status 400 for invalid country code", () => {
    return request(app)
      .get("/api/country_data/public_holidays?year=2023&country_code=9999")
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid country code");
      });
  });
});

describe("GET /api/weather/:city", () => {
  test("200: Returns status 200 and requested weather for the city", () => {
    return request(app)
      .get("/api/country_data/weather/Paris")
      .expect(200)
      .then(({ body }) => {
        const weather: WeatherData[] = body.weather;
        expect(weather).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            country: expect.any(String),
            localtime: expect.any(String),
            weather: expect.objectContaining({
              temp_c: expect.any(Number),
              condition: expect.any(String),
              icon: expect.any(String),
              precip_mm: expect.any(Number),
            }),
          })
        );
      });
  });
  test("500: Returns status 500 for invalid city", () => {
    return request(app)
      .get("/api/country_data/weather/tqrghwbfxgwxfgbvest")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("unexpected error");
      });
  });
});

describe("GET /api/country_data/country_safety/:country_code", () => {
  test("200: Returns status 200 and requested safety data for that country", () => {
    return request(app)
      .get("/api/country_data/country_safety/GB")
      .expect(200)
      .then(({body}) => {
        const safetyData: SafetyData = body.safetyData;
        expect(safetyData).toEqual(expect.objectContaining({
            score: expect.any(Number),
            sources_active: expect.any(Number),
            message: expect.any(String),
            updated: expect.any(String),
            source: expect.any(String),
          }));
      });
  });
  test("400: Returns status 400 for country code", () => {
    return request(app)
      .get("/api/country_data/country_safety/999")
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid country code");
      });
  });
});
