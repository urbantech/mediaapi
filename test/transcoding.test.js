const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Transcoding Routes', () => {
    it('should start transcoding a video', async () => {
        const res = await request(app)
            .post('/transcoding/start/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Transcoding started');
    });
});

