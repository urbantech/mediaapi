const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Search Routes', () => {
    it('should return search results for a keyword', async () => {
        const res = await request(app)
            .get('/search/videos?keyword=travel')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('results');
    });
});

