const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Payments Routes', () => {
    it('should process a payment', async () => {
        const res = await request(app)
            .post('/payments/process')
            .send({
                amount: 100,
                userId: 1
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Payment processed successfully');
    });
});

