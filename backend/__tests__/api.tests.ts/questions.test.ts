import app from "../../app";
import request from "supertest";
import { Document, Types } from "mongoose";

import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose from "mongoose";
import Question from "../../Database/models/question";


let questionId: Types.ObjectId;
beforeAll(async () => await connectDB());
beforeEach(async () => {
  await seed(testData);
  const question = await Question.find({});
  questionId = question[0]._id;
});
afterAll(async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected successfully");
});

describe("GET getQuestions", () => {
  test("200: /api/questions returns status code 200 and all the questions", () => {
    return request(app)
      .get("/api/questions")
      .expect(200)
      .then(({ body }) => {
        const questions: Document[] = body.questions;
        expect(questions).toHaveLength(6);
        questions.forEach((question) => {
          expect(question).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              username: expect.any(String),
              title: expect.any(String),
              body: expect.any(String),
              likes: expect.any(Number),
              topic: expect.any(String),
              country: expect.any(String),
              created_at: expect.any(String),
              reported_count: expect.any(Number),
              user_interactions: expect.any(Array),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: /api/questions?:country_name returns status code 200 and all the questions related to that location", () => {
    return request(app)
      .get("/api/questions?country=Vietnam")
      .expect(200)
      .then(({ body }) => {
        const questions: Document[] = body.questions;
        expect(questions).toHaveLength(2);
        questions.forEach((question) => {
          expect(question).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              username: expect.any(String),
              title: expect.any(String),
              body: expect.any(String),
              likes: expect.any(Number),
              topic: expect.any(String),
              country: "Vietnam",
              created_at: expect.any(String),
              reported_count: expect.any(Number),
              user_interactions: expect.any(Array),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
});
describe("POST postQuestionById", () => {
  const question = {
    username: "SunshineLoz92",
    title: "How long should I stay?",
    body: "How long do you recommend staying? Is there enough to do for a 2 week visit?",
    topic: "activities",
    country: "England",
  };
  test("201: /api/questions returns status code 201 and the posted question", () => {
    return request(app)
      .post("/api/questions")
      .send(question)
      .expect(201)
      .then(({ body }) => {
        const question: Document = body.question;
        expect(question).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            username: "SunshineLoz92",
            title: "How long should I stay?",
            body: "How long do you recommend staying? Is there enough to do for a 2 week visit?",
            likes: 0,
            topic: "activities",
            country: "England",
            created_at: expect.any(String),
            reported_count: 0,
            user_interactions: [],
            __v: 0,
          })
        );
      });
  });
});
describe("DELETE removeQuestionById", () => {
  test("204: /api/questions/:question_id returns status code 204", () => {
    return request(app).delete(`/api/questions/${questionId}`).expect(204);
  });
  test("400: /api/questions/:question_id returns status code 400 when id is not correct format", () => {
    return request(app)
      .delete(`/api/questions/ada`)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid Id");
      });
  });
});
describe("PATCH insertQuestion", () => {
  const updateBody = {
    country: "France",
    body: "Edit: I spoke too soon. Don't come, here",
    title: "France is the best",
    username: "test",
  };
  test("200: /api/questions/:question_id returns status code 200 and the updated question", () => {
    return request(app)
      .patch(`/api/questions/${questionId}`)
      .send(updateBody)
      .expect(200)
      .then(({ body }) => {
        const question: Document = body.question;
        expect(question).toEqual(
          expect.objectContaining({
            _id: questionId.toString(),
            username: expect.any(String),
            title: expect.any(String),
            body: "Edit: I spoke too soon. Don't come, here",
            likes: expect.any(Number),
            topic: expect.any(String),
            country: expect.any(String),
            created_at: expect.any(String),
            reported_count: expect.any(Number),
            user_interactions: expect.any(Array),
            __v: expect.any(Number),
          })
        );
      });
  });
  test("400: /api/questions/:question_id returns status code 400 when id is not correct format", () => {
    return request(app)
      .patch(`/api/questions/ada`)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid Id");
      });
  });
  test("404: /api/questions/:question_id returns status code 404 when id is not found", () => {
    return request(app)
      .patch(`/api/questions/654dda64a415e38d5b1dfb35`)
      .send(updateBody)
      .expect(404)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Id does not exist");
      });
  });
});
describe("GET getCommentsByQuestionId", () => {
  test("200: /api/questions/:question_id/comments returns status code 200 and the list of comments for that specific question", () => {
    return request(app)
      .get(`/api/questions/${questionId}/comments`)
      .expect(200)
      .then(({ body }) => {
        const comments: Document[] = body.comments;
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              question_id: questionId.toString(),
              username: expect.any(String),
              body: expect.any(String),
              likes: expect.any(Number),
              created_at: expect.any(String),
              reported_count: expect.any(Number),
              user_interactions: expect.any(Array),
              __v: expect.any(Number),
            })
          );
        });
      });
  });
  test("400: /api/questions/:question_id/comments returns status code 400 when id is not correct format", () => {
    return request(app)
      .get(`/api/questions/ada/comments`)
      .expect(400)
      .then(({ body: errResponse }) => {
        expect(errResponse.msg).toBe("Invalid Id");
      });
  });
});
describe("POST patchCommentByQuestionId", () => {
  const commentToPost = {
    username: "TD2382",
    body: "Awesome place!",
  };
  /*test('201: /api/questions/:question_id/comments returns status code 201 and the created comment', () => {
        return request(app).post(`/api/questions/${questionId}/comments`).send(commentToPost).expect(201).then(({body}) => {
            const comment: Document = body.comment
            expect(comment).toEqual(expect.objectContaining({
                username: "TD2382",
                question_id: questionId.toString(),
                body:'Awesome place!',
                likes: 0,
                created_at: expect.any(String),
                reported_count: 0,
                user_interactions: [],
            }))
        })
    })
    test('400: /api/questions/:question_id/comments returns status code 400 when id is not correct format', () => {
        return request(app).post(`/api/questions/ada/comments`).expect(400).then(({body: errResponse}) => {
            expect(errResponse.msg).toBe('Invalid Id. Id must be a 24 character hex string, 12 byte Uint8Array, or an integer')
        })
    })*/
});
