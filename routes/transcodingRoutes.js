const express = require('express');
const router = express.Router();
const TranscodingController = require('../controllers/transcodingController')

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

router.post('/start', TranscodingController.createTranscoding );
router.get('/start/:videoId', TranscodingController.getTranscodingById );
router.patch('/start/:videoId', TranscodingController.updateTranscoding);
router.delete('/start/:videoId', TranscodingController.deleteTranscoding );



module.exports = router;

