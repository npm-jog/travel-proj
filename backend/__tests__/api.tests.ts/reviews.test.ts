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

describe("GET getReviewsByLocation", () => {
  test("200: /api/reviews/:country_name returns status 200 and a list of reviews for that location", () => {
    return request(app)
      .get("/api/reviews/USA")
      .expect(200)
      .then(({ body: {reviews}}: any) => {
        console.log(reviews);
        expect(reviews).toHaveLength(2);
        reviews.forEach((review: Document) => {
          expect(review).toEqual(
            expect.objectContaining({
                ratings: expect.any(Object),
                _id: expect.any(String),
                username: expect.any(String),
                body: expect.any(String),
                pictures: expect.any(Array),
                country: 'USA',
                reported_count: expect.any(Number),
                user_interactions: expect.any(Array),
                __v: expect.any(Number),
            })
          );
        });
      });
  });
  test('200: /api/reviews/:country_name returns status 200 and an empty array when passed a country with no reviews', () => {
    return request(app).get('/api/reviews/no_reiews').expect(200).then(({body: {reviews}}: any) =>{
        expect(reviews).toHaveLength(0);
    })
  })
});

describe("GET getReviewsByLocation", () => {

    const postData = {
        username: "Johhny",
        body: "So sunny!",
        ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
        pictures: ['pic'],
        country: "USA",
        reported_count: 0,
      }

    test("200: /api/reviews/:country_name returns status 201 and the newly created review", () => {
        return request(app).post("/api/reviews/:country_name").send(postData).expect(201)
    })
})