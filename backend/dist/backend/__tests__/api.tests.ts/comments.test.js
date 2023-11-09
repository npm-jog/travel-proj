"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const comment_1 = __importDefault(require("../../../Database/models/comment"));
let commentId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)(test_data_1.default);
    const users = yield comment_1.default.find({});
    commentId = users[0]._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
//JAVASCRIPT
describe("PATCH updateCommentById", () => {
    test("200: update a comment's details and returns the updated comment /api/comments/:comment_id", () => {
        const updatedComment = {
            body: "UpdatedComment",
            likes: 2,
            reported_count: 1,
        };
        return (0, supertest_1.default)(app_1.default)
            .patch(`/api/comments/${commentId}`)
            .send(updatedComment)
            .expect(200)
            .then(({ body }) => {
            const expectedComment = {
                _id: expect.any(String),
                question_id: expect.any(String),
                username: expect.any(String),
                body: updatedComment.body,
                likes: 2,
                created_at: expect.any(String),
                reported_count: 1,
                user_interactions: expect.any(Array),
            };
            expect(body.comment).toEqual(expect.objectContaining(expectedComment));
        });
    });
    test("404: should handle errors for a non-existent comment ID", () => {
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/non_existent_id")
            .send({})
            .expect(404);
    });
    test("400: should handle invalid request body", () => {
        const invalidComment = {
            body: true,
            likes: "WrongDataType",
            reported_count: "WrongDataTypeAgain!",
        };
        return (0, supertest_1.default)(app_1.default)
            .patch(`/api/comments/${commentId}`)
            .send(invalidComment)
            .expect(400);
    });
});
describe("DELETE removeCommentById", () => {
    test("204: should delete a comment by ID /api/comments/:comment_id", () => {
        return (0, supertest_1.default)(app_1.default).delete(`/api/comments/${commentId}`).expect(204);
    });
    test("404: can't delete a non-existent comment", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/comments/non_existent_id").expect(404);
    });
});
