const  Booking = require('../models/bookingModel'); // Import your Sequelize models
const  User = require('../models/userModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         date:
 *           type: date
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management
 */

// Controller to create a new booking
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the booking
 */
const createBooking = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const booking = await Booking.create({ date, userId });
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the booking' });
  }
};

// Controller to get a booking by ID
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the booking to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByPk(bookingId, {
      include: [User], // Include associated User information
    });
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a booking by ID
/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the booking to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */
const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { date, userId } = req.body;
    const updatedBooking = await Booking.update(
      { date, userId },
      {
        where: { id: bookingId },
        returning: true,
      }
    );
    if (updatedBooking[0] === 1) {
      res.status(200).json(updatedBooking[1][0]);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a booking by ID
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the booking to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedRows = await Booking.destroy({
      where: { id: bookingId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
