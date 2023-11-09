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
const user_1 = __importDefault(require("../../../Database/models/user"));
let userId;
beforeAll(async () => {
    await (0, connection_1.default)();
});
beforeEach(async () => {
    await (0, seed_1.default)(test_data_1.default);
    const users = await user_1.default.find({});
    userId = users[0]._id;
//JAVASCRIPT
describe("GET fetchUserById", () => {
    test("200: should return a user object with the correct properties /api/users/:user_id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get(`/api/users/${userId}`)
            .expect(200)
            .then(({ body }) => {
            const user = body.user;
            expect(typeof user._id).toBe("string");
            expect(typeof user.forename).toBe("string");
            expect(typeof user.surname).toBe("string");
            expect(typeof user.username).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
            expect(Array.isArray(user.visited_locations)).toBe(true);
            expect(Array.isArray(user.wishlist)).toBe(true);
            expect(typeof user.__v).toBe("number");
        });
    });
    test("404: can't fetch a non-existent user", () => {
        return (0, supertest_1.default)(app_1.default).get("/api/users/non_existent_id").expect(404);
    });
});
describe("POST createUser", () => {
    test("201: should create a new user /api/users", () => {
        const newUser = {
            username: "newUser",
            forename: "Bob",
            surname: "Davis",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .then(({ body }) => {
            const user = body.user;
            expect(user).toHaveProperty("forename", newUser.forename);
            expect(user).toHaveProperty("surname", newUser.surname);
            expect(user).toHaveProperty("username", newUser.username);
            expect(user).toHaveProperty("avatar_url");
            expect(user).toHaveProperty("visited_locations");
            expect(user).toHaveProperty("wishlist");
            expect(user).toHaveProperty("_id");
            expect(user).toHaveProperty("albums");
            expect(user).toHaveProperty("__v");
        });
    });
});
describe("DELETE removeUserById", () => {
    test("204: should delete a user by ID /api/users/:user_id", () => {
        return (0, supertest_1.default)(app_1.default).delete(`/api/users/${userId}`).expect(204);
    });
    test("404: can't delete a non-existent user", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/users/non_existent_id").expect(404);
    });
});
describe("PATCH updateUserById", () => {
    test("200: should update a user by ID /api/users/:user_id", () => {
        const updatedUser = {
            forename: "UpdatedForename",
            surname: "UpdatedSurname",
            username: "UpdatedUsername",
            avatar_url: "https://updated-avatar.com",
            visited_locations: ["newCountry", "newCountry2"],
            wishlist: ["anotherCountry", "anotherCountry2"],
            albums: [{ country: "England", url: "https://england.com" }],
            __v: 1,
        };
        return (0, supertest_1.default)(app_1.default)
            .patch(`/api/users/${userId}`)
            .send(updatedUser)
            .expect(200)
            .then(({ body }) => {
            const expectedUser = {
                _id: expect.any(String),
                forename: expect.any(String),
                surname: expect.any(String),
                username: expect.any(String),
                avatar_url: expect.any(String),
                visited_locations: expect.any(Array),
                wishlist: expect.any(Array),
                albums: expect.any(Array),
            };
            expect(body.user).toEqual(expect.objectContaining(expectedUser));
        });
    });
    });
    test("400: should handle invalid request body", () => {
        const invalidBody = {
            forename: true,
            surname: [],
        };
    });
});
