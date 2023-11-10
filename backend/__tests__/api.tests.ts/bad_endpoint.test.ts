import app from "../../app";
import request from "supertest";

//JAVASCRIPT
import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose, { Types } from "mongoose";

beforeAll(async () => {
  await connectDB();
});
beforeEach(async () => {
  await seed(testData);
});
afterAll(async () => {
  await mongoose.disconnect();
});
//JAVASCRIPT


describe('GET /api/bad_api_endpoint', () => {
    test('404: /api/invalid_path sends back 404 and Bad api endpoint', () => {
        return request(app).get('/api/a_page_that_doesn\'t_exist').expect(404).then(({body}) => {
            expect(body.msg).toBe('Bad api endpoint');
        });
    })
})