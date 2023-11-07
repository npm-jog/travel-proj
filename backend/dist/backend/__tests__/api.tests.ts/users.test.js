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
describe("GET user", () => {
    test("returns status 200", () => {
        return (0, supertest_1.default)(app_1.default).get("/users/1").expect(200).then(x => {
            console.log('kkkkkkkkkk');
        });
    });
    /*test("returns status 400", () => {
      return request(app).get("/users/9999").expect(400);
    });*/
});
describe("POST user", () => {
    test("returns status 201", () => {
        return (0, supertest_1.default)(app_1.default).post("/users").send({}).expect(201);
    });
});
describe("DELETE user", () => {
    test("return status 204", () => {
        return (0, supertest_1.default)(app_1.default).delete("/users/1").expect(204);
    });
});
describe("PATCH user", () => {
    test("return status 200", () => {
        return (0, supertest_1.default)(app_1.default).patch("/users/1").expect(200);
    });
});