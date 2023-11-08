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
beforeAll(() => (0, connection_1.default)());
beforeEach(() => (0, seed_1.default)(test_data_1.default));
afterAll(() => {
    mongoose_1.default.disconnect();
    console.log("MongoDB disconnected successfully");
});
//JAVASCRIPT
describe("GET getReviewsByLocation", () => {
    test("200: /api/reviews/:country_name returns status 200 and a list of reviews for that location", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/reviews/USA")
            .expect(200)
            .then(({ body: { reviews } }) => {
            console.log(reviews);
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
        return (0, supertest_1.default)(app_1.default).get('/api/reviews/no_reiews').expect(200).then(({ body: { reviews } }) => {
            expect(reviews).toHaveLength(0);
        });
    });
});
describe("GET getReviewsByLocation", () => {
    const postData = {
        username: "Johhny",
        body: "So sunny!",
        ratings: { safety: 5, food: 5, activities: 4, cost: 3, scenery: 5 },
        pictures: ['pic'],
        country: "USA",
        reported_count: 0,
    };
    test("200: /api/reviews/:country_name returns status 201 and the newly created review", () => {
        return (0, supertest_1.default)(app_1.default).post("/api/reviews/:country_name").send(postData).expect(201);
    });
});
