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
});
//JAVASCRIPT
describe("GET fetchUserById", () => {
    test("200: /api/users/:user_id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users/1")
            .expect(200)
            .then((x) => { });
    });
    /*test("returns status 400", () => {
      return request(app).get("/users/9999").expect(400);
    });*/
});
describe("POST createUser", () => {
    test("201: /api/users", () => {
        return (0, supertest_1.default)(app_1.default).post("/api/users").send({}).expect(201);
    });
});
describe("DELETE removeUserById", () => {
    test("204: /api/users/:user_id", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/users/1").expect(204);
    });
});
describe("PATCH updateUserById", () => {
    test("200: /api/users/:user_id", () => {
        return (0, supertest_1.default)(app_1.default).patch("/users/1").expect(200);
    });
});
