const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingsController')

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
router.post('/',BookingController.createBooking );
router.get('/:id',BookingController.getBookingById );
router.patch('/:id',BookingController.updateBooking );
router.delete('/:id',BookingController.deleteBooking );

module.exports = router;

