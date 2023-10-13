const Payment  = require('../models/paymentModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *         userId:
 *           type: integer
 *         licenseeId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management
 */

// Controller to create a new Payment entry
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new Payment entry
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Payment entry
 */
const createPayment = async (req, res) => {
  try {
    const { amount, status, userId, licenseeId } = req.body;
    const paymentEntry = await Payment.create({ amount, status, userId, licenseeId });
    res.status(201).json(paymentEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Payment entry' });
  }
};

// Controller to get a Payment entry by ID
/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get a Payment entry by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Payment entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment entry not found
 *       '500':
 *         description: Internal server error
 */
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const paymentEntry = await Payment.findByPk(paymentId);
    if (paymentEntry) {
      res.status(200).json(paymentEntry);
    } else {
      res.status(404).json({ error: 'Payment entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Payment entry by ID
/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Update a Payment entry by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Payment entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment entry not found
 *       '500':
 *         description: Internal server error
 */
const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { amount, status, userId, licenseeId } = req.body;
    const updatedPayment = await Payment.update(
      { amount, status, userId, licenseeId },
      {
        where: { id: paymentId },
        returning: true,
      }
    );
    if (updatedPayment[0] === 1) {
      res.status(200).json(updatedPayment[1][0]);
    } else {
      res.status(404).json({ error: 'Payment entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Payment entry by ID
/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete a Payment entry by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Payment entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Payment entry not found
 *       '500':
 *         description: Internal server error
 */
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletedRows = await Payment.destroy({
      where: { id: paymentId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Payment entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
