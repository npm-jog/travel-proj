import app from "../../app";
import request from "supertest";
import { ReviewType } from '../../interfaces/response.interfaces';
import { Types } from "mongoose";

import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose from "mongoose";
import Review from "../../Database/models/review";

let reviewId: Types.ObjectId;
beforeAll(async () => await connectDB());
beforeEach(async () => {
  await seed(testData);
  const review = await Review.find({});
  reviewId = review[0]._id;
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET getReviewsByLocation", () => {
  test("200: /api/reviews/:country_name returns status 200 and a list of reviews for that location", () => {
    return request(app)
      .get("/api/reviews/USA")
      .expect(200)
      .then(({ body }) => {
        const reviews: ReviewType[] = body.reviews;
        expect(reviews).toHaveLength(2);
        reviews.forEach((review: ReviewType) => {
          expect(review).toEqual(
            expect.objectContaining({
              ratings: expect.any(Object),
              _id: expect.any(String),
              username: expect.any(String),
              body: expect.any(String),
              pictures: expect.any(Array),
              country: "USA",
              reported_count: expect.any(Number),
              user_interactions: expect.any(Array),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: /api/reviews/:country_name returns status 200 and an empty array when passed a country with no reviews", () => {
    return request(app)
      .get("/api/reviews/no_reiews")
      .expect(200)
      .then(({ body }) => {
        const reviews: ReviewType[] = body.reviews;
        expect(reviews).toHaveLength(0);
      });
  });
});

describe("POST postReview", () => {
  const postData = {
    username: "Johhny",
    body: "So sunny!",
    ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
    pictures: ["pic"],
    country: "USA",
    reported_count: 0,
  };
  test("200: /api/reviews/:country_name returns status 201 and the newly created review", () => {
    return request(app)
      .post("/api/reviews/USA")
      .send(postData)
      .expect(201)
      .then(({ body }) => {
        const review: ReviewType = body.postedReview;
        expect(review).toEqual(
          expect.objectContaining({
            username: "Johhny",
            body: "So sunny!",
            ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
            pictures: ["pic"],
            country: "USA",
            reported_count: 0,
            _id: expect.any(String),
            user_interactions: [],
            __v: 0,
          })
        );
      });
  });
  const badPostData = {
    a: "1",
  };
  test("400: /api/reviews/:country_name returns status 400 when missing body data", () => {
    return request(app)
      .post("/api/reviews/USA")
      .send(badPostData)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Bad request: model validation failed");
      });
  });
});

describe("DELETE deleteReviewById", () => {
  test("204: /api/reviews/:review_id returns status 204 with nothing to return since the review is deleted", () => {
    return request(app).delete(`/api/reviews/${reviewId}`).expect(204);
  });
  test("400: /api/reviews/:review_id returns status 400 Invalid Id error message when not passed the correct format ID", () => {
    return request(app)
      .delete(`/api/reviews/invalid_id`)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid Id");
      });
  });
});

describe("PATCH patchReviewById", () => {
  const dataToUpdateWith = {
    country: "France",
    username: "test",
    body: "More than amazing. Would highly recomend",
    ratings: {
      safety: 5,
      food: 5,
      activities: 4,
      cost: 4,
      scenery: 5,
    },
  };
  test("200: /api/reviews/:review_id returns status code 200 new updated review", () => {
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send(dataToUpdateWith)
      .expect(200)
      .then(({ body }) => {
        const review: ReviewType = body.review;
        expect(review).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            username: expect.any(String),
            body: expect.any(String),
            ratings: expect.any(Object),
            pictures: expect.any(Array),
            country: expect.any(String),
            __v: expect.any(Number),
            reported_count: expect.any(Number),
            user_interactions: expect.any(Array),
          })
        );
      });
  });
  test("400: /api/reviews/:review_id returns status code 400 when passed an invalid id", () => {
    return request(app)
      .patch(`/api/reviews/daj`)
      .send(dataToUpdateWith)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid Id");
      });
  });
  test("404: /api/reviews/:review_id returns status code 404 when passed an id that doesn't exist", () => {
    return request(app)
      .patch(`/api/reviews/654e21c5a7e30e9220f0f35e`)
      .send(dataToUpdateWith)
      .expect(404)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Id does not exist");
      });
  });
});
