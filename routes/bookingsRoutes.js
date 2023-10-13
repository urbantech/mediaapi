const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /bookings/make:
 *   post:
 *     summary: Make a booking through a video
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking made successfully
 */
router.post('/make', (req, res) => {
    // Booking logic here
    res.status(200).send('Booking made successfully');
});

module.exports = router;

