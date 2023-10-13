const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Rewards Routes', () => {
    it('should claim a reward for a user', async () => {
        const res = await request(app)
            .post('/rewards/claim')
            .send({
                userId: 1,
                rewardType: 'points'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Reward claimed successfully');
    });
});

