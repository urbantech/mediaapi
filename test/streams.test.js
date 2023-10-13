const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Streams Routes', () => {
    it('should start streaming a video', async () => {
        const res = await request(app)
            .get('/streams/video/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Streaming started');
    });
});

