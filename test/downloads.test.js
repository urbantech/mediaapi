const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Downloads Routes', () => {
    it('should initiate a download for a video', async () => {
        const res = await request(app)
            .get('/downloads/video/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Download initiated');
    });
});

