"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
/*beforeAll(() => connectDB());
beforeEach(() => seed(testData));
afterAll(() => {
  mongoose.disconnect();
  console.log("MongoDB disconnected successfully");
});*/
//JAVASCRIPT
describe("GET getWishlistByUserId", () => {
    test("200: /api/wishlist/:user_id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/wishlist/1")
            .expect(200)
            .then((x) => { });
    });
});
describe("POST postLocationByUserId", () => {
    test("201: /api/wishlist/:user_id", () => {
        return (0, supertest_1.default)(app_1.default).post("/api/wishlist/1").send({}).expect(201);
    });
});
describe("DELETE deleteLocationByCountryName", () => {
    test("204: /api/wishlist/:user_id/:country_name", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/wishlist/Italy").expect(204);
    });
});
