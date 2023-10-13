const Transcoding  = require('../models/transcodingModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Transcoding:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         videoId:
 *           type: integer
 *         format:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Transcoding
 *   description: Transcoding management
 */

// Controller to create a new Transcoding entry
/**
 * @swagger
 * /transcoding:
 *   post:
 *     summary: Create a new Transcoding entry
 *     tags: [Transcoding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transcoding'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Transcoding entry
 */
const createTranscoding = async (req, res) => {
  try {
    const { videoId, format, status } = req.body;
    const transcodingEntry = await Transcoding.create({ videoId, format, status });
    res.status(201).json(transcodingEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Transcoding entry' });
  }
};

// Controller to get a Transcoding entry by ID
/**
 * @swagger
 * /transcoding/{id}:
 *   get:
 *     summary: Get a Transcoding entry by ID
 *     tags: [Transcoding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Transcoding entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transcoding'
 *       '404':
 *         description: Transcoding entry not found
 *       '500':
 *         description: Internal server error
 */
const getTranscodingById = async (req, res) => {
  try {
    const transcodingId = req.params.id;
    const transcodingEntry = await Transcoding.findByPk(transcodingId);
    if (transcodingEntry) {
      res.status(200).json(transcodingEntry);
    } else {
      res.status(404).json({ error: 'Transcoding entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Transcoding entry by ID
/**
 * @swagger
 * /transcoding/{id}:
 *   put:
 *     summary: Update a Transcoding entry by ID
 *     tags: [Transcoding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Transcoding entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transcoding'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transcoding'
 *       '404':
 *         description: Transcoding entry not found
 *       '500':
 *         description: Internal server error
 */
const updateTranscoding = async (req, res) => {
  try {
    const transcodingId = req.params.id;
    const { videoId, format, status } = req.body;
    const updatedTranscoding = await Transcoding.update(
      { videoId, format, status },
      {
        where: { id: transcodingId },
        returning: true,
      }
    );
    if (updatedTranscoding[0] === 1) {
      res.status(200).json(updatedTranscoding[1][0]);
    } else {
      res.status(404).json({ error: 'Transcoding entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Transcoding entry by ID
/**
 * @swagger
 * /transcoding/{id}:
 *   delete:
 *     summary: Delete a Transcoding entry by ID
 *     tags: [Transcoding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Transcoding entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Transcoding entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteTranscoding = async (req, res) => {
  try {
    const transcodingId = req.params.id;
    const deletedRows = await Transcoding.destroy({
      where: { id: transcodingId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Transcoding entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTranscoding,
  getTranscodingById,
  updateTranscoding,
  deleteTranscoding,
};
