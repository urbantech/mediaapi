const express = require('express');
const router = express.Router();
const DRMController = require('../controllers/drmController')

/**
 * @swagger
 * /drm/protect/{videoId}:
 *   post:
 *     summary: Apply DRM protection to a video by its ID
 *     tags: [DRM]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: DRM protection applied
 */
router.post('/protect/', DRMController.createDRM);
router.get('/protect/:videoId', DRMController.getDRMById);
router.patch('/protect/:videoId', DRMController.updateDRM);
router.delete('/protect/:videoId', DRMController.deleteDRM);

module.exports = router;

