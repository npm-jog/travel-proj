import app from "../../app";
import request from "supertest";
import {PublicHolidays} from '../../types/country-data.interfaces';

describe('GET /api/public_holidays/:year/:country_code', () => {
    test('200: Returns status 200 and requested public holidays for the country in that year', () => {
        return request(app).get('/api/country_data/public_holidays?year=2023&country_code=AT').expect(200).then(({body}) => {
            const publicHolidays: PublicHolidays[] = body.publicHolidays;
            publicHolidays.forEach((publicHoliday: PublicHolidays) => {
                expect(publicHoliday).toEqual(expect.objectContaining({
                    date: expect.any(String),
                    localName: expect.any(String),
                    name: expect.any(String),
                    countryCode: expect.any(String),
                    fixed: expect.any(Boolean),
                    global: expect.any(Boolean),
                    types: expect.any(Array)
                }))
            })
        })
    })
    test('200: Returns status 400 and requested public holidays for the country in that year', () => {
        return request(app).get('/api/country_data/public_holidays?year=invalid_year&country_code=AT').expect(400).then(({body: errResponse}) => {
            const errMessage: string = errResponse.msg
            expect(errMessage).toBe('Bad query request');
        })
    })
    test('200: Returns status 400 and requested public holidays for the country in that year', () => {
        return request(app).get('/api/country_data/public_holidays?year=2023&country_code=ZG').expect(404).then(({body: errResponse}) => {
            const errMessage: string = errResponse.msg
            expect(errMessage).toBe('Invalid country code');
        })
    })
    test('200: Returns status 400 and requested public holidays for the country in that year', () => {
        return request(app).get('/api/country_data/public_holidays?year=2023&country_code=9999').expect(400).then(({body: errResponse}) => {
            const errMessage: string = errResponse.msg
            expect(errMessage).toBe('Invalid country code');
        })
    })
})