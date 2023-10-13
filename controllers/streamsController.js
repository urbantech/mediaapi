const Stream  = require('../models/streamModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Stream:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         videoId:
 *           type: integer
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Stream
 *   description: Stream management
 */

// Controller to create a new Stream entry
/**
 * @swagger
 * /stream:
 *   post:
 *     summary: Create a new Stream entry
 *     tags: [Stream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stream'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Stream entry
 */
const createStream = async (req, res) => {
  try {
    const { videoId, userId } = req.body;
    const streamEntry = await Stream.create({ videoId, userId });
    res.status(201).json(streamEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Stream entry' });
  }
};

// Controller to get a Stream entry by ID
/**
 * @swagger
 * /stream/{id}:
 *   get:
 *     summary: Get a Stream entry by ID
 *     tags: [Stream]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Stream entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stream'
 *       '404':
 *         description: Stream entry not found
 *       '500':
 *         description: Internal server error
 */
const getStreamById = async (req, res) => {
  try {
    const streamId = req.params.id;
    const streamEntry = await Stream.findByPk(streamId);
    if (streamEntry) {
      res.status(200).json(streamEntry);
    } else {
      res.status(404).json({ error: 'Stream entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Stream entry by ID
/**
 * @swagger
 * /stream/{id}:
 *   put:
 *     summary: Update a Stream entry by ID
 *     tags: [Stream]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Stream entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stream'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stream'
 *       '404':
 *         description: Stream entry not found
 *       '500':
 *         description: Internal server error
 */
const updateStream = async (req, res) => {
  try {
    const streamId = req.params.id;
    const { videoId, userId } = req.body;
    const updatedStream = await Stream.update(
      { videoId, userId },
      {
        where: { id: streamId },
        returning: true,
      }
    );
    if (updatedStream[0] === 1) {
      res.status(200).json(updatedStream[1][0]);
    } else {
      res.status(404).json({ error: 'Stream entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Stream entry by ID
/**
 * @swagger
 * /stream/{id}:
 *   delete:
 *     summary: Delete a Stream entry by ID
 *     tags: [Stream]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Stream entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Stream entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteStream = async (req, res) => {
  try {
    const streamId = req.params.id;
    const deletedRows = await Stream.destroy({
      where: { id: streamId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Stream entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createStream,
  getStreamById,
  updateStream,
  deleteStream,
};
