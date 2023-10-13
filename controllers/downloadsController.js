const Download = require('../models/downloadModel'); // Import your Sequelize models
const  User = require('../models/userModel'); // Import your Sequelize models
const Video = require('../models/videoModel')
/**
 * @swagger
 * components:
 *   schemas:
 *     Download:
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
 *   name: Download
 *   description: Download management
 */

// Controller to create a new download
/**
 * @swagger
 * /downloads:
 *   post:
 *     summary: Create a new download
 *     tags: [Download]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Download'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the download
 */
const createDownload = async (req, res) => {
  try {
    const { videoId, userId } = req.body;
    const download = await Download.create({ videoId, userId });
    res.status(201).json(download);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the download' });
  }
};

// Controller to get a download by ID
/**
 * @swagger
 * /downloads/{id}:
 *   get:
 *     summary: Get a download by ID
 *     tags: [Download]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the download to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Download'
 *       '404':
 *         description: Download not found
 *       '500':
 *         description: Internal server error
 */
const getDownloadById = async (req, res) => {
  try {
    const downloadId = req.params.id;
    const download = await Download.findByPk(downloadId, {
      include: [Video, User], // Include associated Video and User information
    });
    if (download) {
      res.status(200).json(download);
    } else {
      res.status(404).json({ error: 'Download not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a download by ID
/**
 * @swagger
 * /downloads/{id}:
 *   put:
 *     summary: Update a download by ID
 *     tags: [Download]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the download to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Download'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Download'
 *       '404':
 *         description: Download not found
 *       '500':
 *         description: Internal server error
 */
const updateDownload = async (req, res) => {
  try {
    const downloadId = req.params.id;
    const { videoId, userId } = req.body;
    const updatedDownload = await Download.update(
      { videoId, userId },
      {
        where: { id: downloadId },
        returning: true,
      }
    );
    if (updatedDownload[0] === 1) {
      res.status(200).json(updatedDownload[1][0]);
    } else {
      res.status(404).json({ error: 'Download not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a download by ID
/**
 * @swagger
 * /downloads/{id}:
 *   delete:
 *     summary: Delete a download by ID
 *     tags: [Download]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the download to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Download not found
 *       '500':
 *         description: Internal server error
 */
const deleteDownload = async (req, res) => {
  try {
    const downloadId = req.params.id;
    const deletedRows = await Download.destroy({
      where: { id: downloadId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Download not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDownload,
  getDownloadById,
  updateDownload,
  deleteDownload,
};
