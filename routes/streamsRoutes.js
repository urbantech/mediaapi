const express = require('express');
const router = express.Router();
const StreamController = require('../controllers/streamsController')

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


router.post('/videos', StreamController.createStream );
router.get('/videos/:videoId', StreamController.getStreamById );
router.patch('/videos/:videoId', StreamController.updateStream);
router.delete('/videos/:videoId', StreamController.deleteStream );


module.exports = router;


