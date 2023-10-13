const express = require('express');
const router = express.Router();
const LicenseeController = require('../controllers/licenseesController')

/**
 * @swagger
 * /licensees/register:
 *   post:
 *     summary: Register a new licensee
 *     tags: [Licensees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Licensee registered successfully
 */
router.post('/register',LicenseeController.createLicensee );
router.get('/register/:id',LicenseeController.getLicenseeById );
router.patch('/register/:id',LicenseeController.updateLicensee );
router.delete('/register/:id',LicenseeController.deleteLicensee );


module.exports = router;

