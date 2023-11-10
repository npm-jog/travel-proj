import app from "../../app";
import request from "supertest";

describe('GET /api/country-data', () => {
    test('200: Returns status 200 and requested country data for country page', () => {
        return request(app).get('/api/country-data').expect(200).then(x => {
        })
    })
})