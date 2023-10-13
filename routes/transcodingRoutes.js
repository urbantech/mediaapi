const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /transcoding/start/{videoId}:
 *   post:
 *     summary: Start transcoding a video by its ID
 *     tags: [Transcoding]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transcoding started
 */
router.post('/start/:videoId', (req, res) => {
    // Transcoding logic here
    res.status(200).send('Transcoding started');
});

module.exports = router;

