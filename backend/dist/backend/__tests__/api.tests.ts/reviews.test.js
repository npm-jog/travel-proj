"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
//JAVASCRIPT
const connection_1 = __importDefault(require("./../../../Database/db/connection"));
const seed_1 = __importDefault(require("./../../../Database/db/seed/seed"));
const test_data_1 = __importDefault(require("./../../../Database/db/data/test-data"));
const mongoose_1 = __importDefault(require("mongoose"));
const review_1 = __importDefault(require("../../../Database/models/review"));
let reviewId;
beforeAll(async () => await (0, connection_1.default)());
beforeEach(async () => {
    await (0, seed_1.default)(test_data_1.default);
    const review = await review_1.default.find({});
    reviewId = review[0]._id;
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    console.log("MongoDB disconnected successfully");
});
//JAVASCRIPT
describe("GET getReviewsByLocation", () => {
    test("200: /api/reviews/:country_name returns status 200 and a list of reviews for that location", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/reviews/USA")
            .expect(200)
            .then(({ body }) => {
            const reviews = body.reviews;
            expect(reviews).toHaveLength(2);
            reviews.forEach((review) => {
                expect(review).toEqual(expect.objectContaining({
                    ratings: expect.any(Object),
                    _id: expect.any(String),
                    username: expect.any(String),
                    body: expect.any(String),
                    pictures: expect.any(Array),
                    country: 'USA',
                    reported_count: expect.any(Number),
                    user_interactions: expect.any(Array),
                    __v: expect.any(Number),
                }));
            });
        });
    });
    test('200: /api/reviews/:country_name returns status 200 and an empty array when passed a country with no reviews', () => {
        return (0, supertest_1.default)(app_1.default).get('/api/reviews/no_reiews').expect(200).then(({ body }) => {
            const reviews = body.reviews;
            expect(reviews).toHaveLength(0);
        });
    });
});
describe("POST postReview", () => {
    const postData = {
        username: "Johhny",
        body: "So sunny!",
        ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
        pictures: ['pic'],
        country: "USA",
        reported_count: 0,
    };
    test("200: /api/reviews/:country_name returns status 201 and the newly created review", () => {
        return (0, supertest_1.default)(app_1.default).post("/api/reviews/USA").send(postData).expect(201).then(({ body }) => {
            const review = body.postedReview;
            expect(review).toEqual(expect.objectContaining({
                username: 'Johhny',
                body: 'So sunny!',
                ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
                pictures: ['pic'],
                country: 'USA',
                reported_count: 0,
                _id: expect.any(String),
                user_interactions: [],
                __v: 0
            }));
        });
    });
    const badPostData = {
        a: '1'
    };
    test("400: /api/reviews/:country_name returns status 400 when missing body data", () => {
        return (0, supertest_1.default)(app_1.default).post("/api/reviews/USA").send(badPostData).expect(400).then(({ body: errResponse }) => {
            expect(errResponse.msg).toBe('Bad request: model validation failed');
        });
    });
});
describe('DELETE deleteReviewById', () => {
    test('204: /api/reviews/:review_id returns status 204 with nothing to return since the review is deleted', () => {
        return (0, supertest_1.default)(app_1.default).delete(`/api/reviews/${reviewId}`).expect(204);
    });
    test('400: /api/reviews/:review_id returns status 400 Invalid Id error message when not passed the correct format ID', () => {
        return (0, supertest_1.default)(app_1.default).delete(`/api/reviews/invalid_id`).expect(400).then(({ body: errResponse }) => {
            expect(errResponse.msg).toBe('Invalid Id. Id must be a 24 character hex string, 12 byte Uint8Array, or an integer');
        });
    });
});
describe('PATCH patchReviewById', () => {
    const dataToUpdateWith = {
        body: "More than amazing. Would highly recomend",
        ratings: { safety: 5, food: 5, activities: 4, cost: 4, scenery: 5 },
    };
    test('200: /api/reviews/:review_id returns status code 200 new updated review', () => {
        return (0, supertest_1.default)(app_1.default).patch(`/api/reviews/${reviewId}`).send(dataToUpdateWith).expect(200).then(({ body }) => {
            const review = body.review;
            expect(review).toEqual(expect.objectContaining({
                _id: expect.any(String),
                username: expect.any(String),
                body: expect.any(String),
                ratings: expect.any(Object),
                pictures: expect.any(Array),
                country: expect.any(String),
                __v: expect.any(Number),
                reported_count: expect.any(Number),
                user_interactions: expect.any(Array),
            }));
        });
    });
    test('400: /api/reviews/:review_id returns status code 400 when passed an invalid id', () => {
        return (0, supertest_1.default)(app_1.default).patch(`/api/reviews/daj`).send(dataToUpdateWith).expect(400).then(({ body: errResponse }) => {
            expect(errResponse.msg).toBe('Invalid Id. Id must be a 24 character hex string, 12 byte Uint8Array, or an integer');
        });
    });
    test('404: /api/reviews/:review_id returns status code 404 when passed an id that doesn\'t exist', () => {
        return (0, supertest_1.default)(app_1.default).patch(`/api/reviews/654cc9d16d5311e2f3e12fdd`).send(dataToUpdateWith).expect(404).then(({ body: errResponse }) => {
            expect(errResponse.msg).toBe('Id does not exist');
        });
    });
    test('200: /api/reviews/:review_id returns status 200 nothign changed from origional review when no data passed in', () => {
        return (0, supertest_1.default)(app_1.default).patch(`/api/reviews/${reviewId}`).send({}).expect(200).then(({ body }) => {
            const review = body.review;
            const newReviewId = review._id;
            expect(review).toEqual(expect.objectContaining({
                _id: newReviewId,
                username: expect.any(String),
                body: expect.any(String),
                ratings: expect.any(Object),
                pictures: expect.any(Array),
                country: expect.any(String),
                __v: expect.any(Number),
                reported_count: expect.any(Number),
                user_interactions: expect.any(Array),
            }));
        });
    });
});
