const express = require('express');
const router = express.Router();
const DownloadController = require('../controllers/downloadsController')


/**
 * @swagger
 * /downloads/video/{videoId}:
 *   get:
 *     summary: Download a video by its ID
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video downloaded successfully
 */
router.get('/video/:videoId', DownloadController.getDownloadById);
router.post('/video/:videoId', DownloadController.createDownload);
router.patch('/video/:videoId', DownloadController.updateDownload);
router.delete('/video/:videoId', DownloadController.deleteDownload);

module.exports = router;

