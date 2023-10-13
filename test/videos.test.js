const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Video Routes', () => {
    it('should upload a video', async () => {
        const res = await request(app)
            .post('/videos/upload')
            .attach('video', 'path_to_video_file.mp4');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Video uploaded successfully');
    });
});

