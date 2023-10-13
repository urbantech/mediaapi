const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videosController')

/**
 * @swagger
 * /videos/upload:
 *   post:
 *     summary: Upload a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 */

router.post('/upload', VideoController.createVideo);
router.get('/upload/:id', VideoController.getVideoById);
router.patch('/upload/:id', VideoController.updateVideo);
router.delete('/upload/:id', VideoController.deleteVideo);


module.exports = router;

