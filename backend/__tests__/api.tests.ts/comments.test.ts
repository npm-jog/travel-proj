import app from "../../app";
import request from "supertest";

//JAVASCRIPT
import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose, { Types } from "mongoose";
import Comment from "../../Database/models/comment";

let commentId: Types.ObjectId;

beforeAll(async () => {
  await connectDB();
});
beforeEach(async () => {
  await seed(testData);
  const users = await Comment.find({});
  commentId = users[0]._id;
});
afterAll(async () => {
  await mongoose.disconnect();
});
//JAVASCRIPT

describe("PATCH updateCommentById", () => {
  test("200: update a comment's details and returns the updated comment /api/comments/:comment_id", () => {
    const updatedComment = {
      username: "test",
      question_id: "654e21c5a7e30e9220f0f141",
      body: "UpdatedComment",
      likes: 2,
      reported_count: 1,
    };
    return request(app)
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
    return request(app).patch("/api/comments/non_existent_id").send({}).expect(404);
  });
  test("400: should handle invalid request body", () => {
    const invalidComment = {
      body: true,
      likes: "WrongDataType",
      reported_count: "WrongDataTypeAgain!",
    };
    return request(app).patch(`/api/comments/${commentId}`).send(invalidComment).expect(400);
  });
});

describe("DELETE removeCommentById", () => {
  test("204: should delete a comment by ID /api/comments/:comment_id", () => {
    return request(app).delete(`/api/comments/${commentId}`).expect(204);
  });
  test("404: can't delete a non-existent comment", () => {
    return request(app).delete("/api/comments/non_existent_id").expect(404);
  });
});
