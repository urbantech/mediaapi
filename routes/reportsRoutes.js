const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportsController')

/**
 * @swagger
 * /reports/submit:
 *   post:
 *     summary: Submit a report for a video
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoId:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report submitted successfully
 */
router.post('/submit', ReportController.createReport );
router.get('/submit/:id', ReportController.getReportById );
router.patch('/submit/:id', ReportController.updateReport);
router.delete('/submit/:id', ReportController.deleteReport );

module.exports = router;

