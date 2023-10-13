const { Report } = require('../models'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         reason:
 *           type: string
 *         description:
 *           type: string
 *         videoId:
 *           type: integer
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Report management
 */

// Controller to create a new Report entry
/**
 * @swagger
 * /report:
 *   post:
 *     summary: Create a new Report entry
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Report entry
 */
const createReport = async (req, res) => {
  try {
    const { reason, description, videoId, userId } = req.body;
    const reportEntry = await Report.create({ reason, description, videoId, userId });
    res.status(201).json(reportEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Report entry' });
  }
};

// Controller to get a Report entry by ID
/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get a Report entry by ID
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Report entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       '404':
 *         description: Report entry not found
 *       '500':
 *         description: Internal server error
 */
const getReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    const reportEntry = await Report.findByPk(reportId);
    if (reportEntry) {
      res.status(200).json(reportEntry);
    } else {
      res.status(404).json({ error: 'Report entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Report entry by ID
/**
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: Update a Report entry by ID
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Report entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       '404':
 *         description: Report entry not found
 *       '500':
 *         description: Internal server error
 */
const updateReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { reason, description, videoId, userId } = req.body;
    const updatedReport = await Report.update(
      { reason, description, videoId, userId },
      {
        where: { id: reportId },
        returning: true,
      }
    );
    if (updatedReport[0] === 1) {
      res.status(200).json(updatedReport[1][0]);
    } else {
      res.status(404).json({ error: 'Report entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Report entry by ID
/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Delete a Report entry by ID
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Report entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Report entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedRows = await Report.destroy({
      where: { id: reportId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Report entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
};
