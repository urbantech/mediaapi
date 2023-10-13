const request = require('supertest');
const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Booking Routes', () => {
    it('should make a booking through a video', async () => {
        const res = await request(app)
            .post('/bookings/make')
            .send({
                videoId: 1,
                userId: 1
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Booking made successfully');
    });
});

