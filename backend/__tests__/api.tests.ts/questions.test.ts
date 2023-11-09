import app from "../../app";
import request from "supertest";
import { Document, Types } from "mongoose";

//JAVASCRIPT
import connectDB from "./../../../Database/db/connection";
import seed from "./../../../Database/db/seed/seed";
import testData, { questionData } from "./../../../Database/db/data/test-data";
import mongoose from "mongoose";
import Question from "../../../Database/models/question";
let questionId: Types.ObjectId;
beforeAll(async () => await connectDB());
beforeEach(async () => {
  await seed(testData)
  const question = await Question.find({})
  questionId = question[0]._id
});
afterAll(async () => {await mongoose.disconnect();
  console.log("MongoDB disconnected successfully");
});
//JAVASCRIPT

//fetchQuestions, updateQuestionById, removeQuestionById, insertQuestion, fetchCommentsByQuestionId, insertCommentByQuestionId

describe("GET getQuestions", () => {
    //takes optional query
    test('200: /api/questions returns status code 200 and all the questions', () => {
        return request(app).get('/api/questions').expect(200).then(({body}) => {
            const questions: Document[] = body.questions
            expect(questions).toHaveLength(6);
            questions.forEach(question => {
                expect(question).toEqual(expect.objectContaining({
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
                    __v: expect.any(Number)
                }))
            })
        })
    })
    test('200: /api/questions?:country_name returns status code 200 and all the questions related to that location', () => {
        return request(app).get('/api/questions?country=Vietnam').expect(200).then(({body}) => {
            const questions: Document[] = body.questions
            expect(questions).toHaveLength(2);
            questions.forEach(question => {
                expect(question).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    username: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    likes: expect.any(Number),
                    topic: expect.any(String),
                    country: 'Vietnam',
                    created_at: expect.any(String),
                    reported_count: expect.any(Number),
                    user_interactions: expect.any(Array),
                    __v: expect.any(Number)
                }))
            })
        })
    })
    test.only('400 /api/questions?:invalid_country_name returns status 400 ', () => {
        return request(app).get(`/api/questions?999`).expect(200).then(({body: errResponse}) => {
            console.log(errResponse, 'here')
            expect(errResponse.msg).toBe('Invalid query. Query must be a string')
        })
    })
});
describe("POST postQuestionById", () => {
})
describe('DELETE removeQuestionById', () => {
})
describe("PATH insertQuestion", () => {
});
describe("GET getCommentsByQuestionId", () => {
})
describe('PATCH patchCommentByQuestionId', () => {
})