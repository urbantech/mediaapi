const request = require('supertest');
const app = require('../app'); // Your Express app

describe('DRM Routes', () => {
    it('should apply DRM protection to a video', async () => {
        const res = await request(app)
            .post('/drm/protect/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'DRM protection applied');
    });
});

