const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentsController')

/**
 * @swagger
 * /payments/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Payment processed successfully
 */
router.post('/process',PaymentController.createPayment);
router.get('/process/:id',PaymentController.getPaymentById);
router.patch('/process/:id',PaymentController.updatePayment);
router.delete('/process/:id',PaymentController.deletePayment);


module.exports = router;

