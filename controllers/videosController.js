const Video  = require('../models/videoModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         url:
 *           type: string
 *         thumbnail:
 *           type: string
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Video
 *   description: Video management
 */

// Controller to create a new Video entry
/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a new Video entry
 *     tags: [Video]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Video entry
 */
const createVideo = async (req, res) => {
  try {
    const { title, description, url, thumbnail, userId } = req.body;
    const videoEntry = await Video.create({ title, description, url, thumbnail, userId });
    res.status(201).json(videoEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Video entry' });
  }
};

// Controller to get a Video entry by ID
/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get a Video entry by ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Video entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       '404':
 *         description: Video entry not found
 *       '500':
 *         description: Internal server error
 */
const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const videoEntry = await Video.findByPk(videoId);
    if (videoEntry) {
      res.status(200).json(videoEntry);
    } else {
      res.status(404).json({ error: 'Video entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Video entry by ID
/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update a Video entry by ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Video entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       '404':
 *         description: Video entry not found
 *       '500':
 *         description: Internal server error
 */
const updateVideo = async (req) => {
  try {
    const videoId = req.params.id;
    const { title, description, url, thumbnail, userId } = req.body;
    const updatedVideo = await Video.update(
      { title, description, url, thumbnail, userId },
      {
        where: { id: videoId },
        returning: true,
      }
    );
    if (updatedVideo[0] === 1) {
      return updatedVideo[1][0];
    } else {
      throw new Error('Video entry not found');
    }
  } catch (error) {
    throw new Error('Internal server error');
  }
};

// Controller to delete a Video entry by ID
/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete a Video entry by ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Video entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Video entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteVideo = async (req) => {
  try {
    const videoId = req.params.id;
    const deletedRows = await Video.destroy({
      where: { id: videoId },
    });
    if (deletedRows === 1) {
      return;
    } else {
      throw new Error('Video entry not found');
    }
  } catch (error) {
    throw new Error('Internal server error');
  }
};

module.exports = {
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
};
