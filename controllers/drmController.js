const { DRM, Video } = require('../models'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     DRM:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         videoId:
 *           type: integer
 *         drmType:
 *           type: string
 *         drmKey:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: DRM
 *   description: DRM (Digital Rights Management) management
 */

// Controller to create a new DRM entry
/**
 * @swagger
 * /drm:
 *   post:
 *     summary: Create a new DRM entry
 *     tags: [DRM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DRM'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the DRM entry
 */
const createDRM = async (req, res) => {
  try {
    const { videoId, drmType, drmKey } = req.body;
    const drmEntry = await DRM.create({ videoId, drmType, drmKey });
    res.status(201).json(drmEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the DRM entry' });
  }
};

// Controller to get a DRM entry by ID
/**
 * @swagger
 * /drm/{id}:
 *   get:
 *     summary: Get a DRM entry by ID
 *     tags: [DRM]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the DRM entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DRM'
 *       '404':
 *         description: DRM entry not found
 *       '500':
 *         description: Internal server error
 */
const getDRMById = async (req, res) => {
  try {
    const drmId = req.params.id;
    const drmEntry = await DRM.findByPk(drmId, {
      include: Video, // Include associated Video information
    });
    if (drmEntry) {
      res.status(200).json(drmEntry);
    } else {
      res.status(404).json({ error: 'DRM entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a DRM entry by ID
/**
 * @swagger
 * /drm/{id}:
 *   put:
 *     summary: Update a DRM entry by ID
 *     tags: [DRM]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the DRM entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DRM'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DRM'
 *       '404':
 *         description: DRM entry not found
 *       '500':
 *         description: Internal server error
 */
const updateDRM = async (req, res) => {
  try {
    const drmId = req.params.id;
    const { videoId, drmType, drmKey } = req.body;
    const updatedDRM = await DRM.update(
      { videoId, drmType, drmKey },
      {
        where: { id: drmId },
        returning: true,
      }
    );
    if (updatedDRM[0] === 1) {
      res.status(200).json(updatedDRM[1][0]);
    } else {
      res.status(404).json({ error: 'DRM entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a DRM entry by ID
/**
 * @swagger
 * /drm/{id}:
 *   delete:
 *     summary: Delete a DRM entry by ID
 *     tags: [DRM]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the DRM entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: DRM entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteDRM = async (req, res) => {
  try {
    const drmId = req.params.id;
    const deletedRows = await DRM.destroy({
      where: { id: drmId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'DRM entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDRM,
  getDRMById,
  updateDRM,
  deleteDRM,
};
