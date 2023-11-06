import app from '../../app';
import request from "supertest";

describe('GET user', () => {
    test('returns status 200', () => {
        request(app).get('/').expect(201);
    })
})