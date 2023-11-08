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
describe("GET fetchAllCountries", () => {
    test("200: /api/countries", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/countries")
            .expect(200)
            .then(({ body: { countries } }) => {
            console.log(countries);
            expect(countries).toHaveLength(18);
            countries.forEach((country) => {
                expect(country).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    name: expect.any(String),
                    __v: expect.any(Number),
                }));
            });
        });
    });
});
