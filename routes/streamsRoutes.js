const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /streams/video/{videoId}:
 *   get:
 *     summary: Stream a video by its ID
 *     tags: [Streams]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video streaming initiated
 */
router.get('/video/:videoId', (req, res) => {
    // Video streaming logic here
    res.status(200).send('Video streaming initiated');
});

module.exports = router;


