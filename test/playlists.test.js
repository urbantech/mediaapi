const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Playlist Routes', () => {
    it('should create a new playlist', async () => {
        const res = await request(app)
            .post('/playlists/create')
            .send({
                name: 'My Favorite Videos',
                userId: 1
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Playlist created successfully');
    });
});

