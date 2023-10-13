const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Report Routes', () => {
    it('should submit a report for a video', async () => {
        const res = await request(app)
            .post('/reports/submit')
            .send({
                videoId: 1,
                reason: 'Inappropriate content'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Report submitted successfully');
    });
});

