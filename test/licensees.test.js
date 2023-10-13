const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Licensees Routes', () => {
    it('should register a new licensee', async () => {
        const res = await request(app)
            .post('/licensees/register')
            .send({
                companyName: 'MediaCorp',
                contactEmail: 'contact@mediacorp.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Licensee registered successfully');
    });
});

