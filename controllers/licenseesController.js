const Licensee  = require('../models/licenseeModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Licensee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         companyName:
 *           type: string
 *         contactEmail:
 *           type: string
 *         licenseType:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Licensee
 *   description: Licensee management
 */

// Controller to create a new Licensee entry
/**
 * @swagger
 * /licensee:
 *   post:
 *     summary: Create a new Licensee entry
 *     tags: [Licensee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Licensee'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Licensee entry
 */
const createLicensee = async (req, res) => {
  try {
    const { companyName, contactEmail, licenseType } = req.body;
    const licenseeEntry = await Licensee.create({ companyName, contactEmail, licenseType });
    res.status(201).json(licenseeEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Licensee entry' });
  }
};

// Controller to get a Licensee entry by ID
/**
 * @swagger
 * /licensee/{id}:
 *   get:
 *     summary: Get a Licensee entry by ID
 *     tags: [Licensee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Licensee entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Licensee'
 *       '404':
 *         description: Licensee entry not found
 *       '500':
 *         description: Internal server error
 */
const getLicenseeById = async (req, res) => {
  try {
    const licenseeId = req.params.id;
    const licenseeEntry = await Licensee.findByPk(licenseeId);
    if (licenseeEntry) {
      res.status(200).json(licenseeEntry);
    } else {
      res.status(404).json({ error: 'Licensee entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Licensee entry by ID
/**
 * @swagger
 * /licensee/{id}:
 *   put:
 *     summary: Update a Licensee entry by ID
 *     tags: [Licensee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Licensee entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Licensee'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Licensee'
 *       '404':
 *         description: Licensee entry not found
 *       '500':
 *         description: Internal server error
 */
const updateLicensee = async (req, res) => {
  try {
    const licenseeId = req.params.id;
    const { companyName, contactEmail, licenseType } = req.body;
    const updatedLicensee = await Licensee.update(
      { companyName, contactEmail, licenseType },
      {
        where: { id: licenseeId },
        returning: true,
      }
    );
    if (updatedLicensee[0] === 1) {
      res.status(200).json(updatedLicensee[1][0]);
    } else {
      res.status(404).json({ error: 'Licensee entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Licensee entry by ID
/**
 * @swagger
 * /licensee/{id}:
 *   delete:
 *     summary: Delete a Licensee entry by ID
 *     tags: [Licensee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Licensee entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Licensee entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteLicensee = async (req, res) => {
  try {
    const licenseeId = req.params.id;
    const deletedRows = await Licensee.destroy({
      where: { id: licenseeId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Licensee entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createLicensee,
  getLicenseeById,
  updateLicensee,
  deleteLicensee,
};
