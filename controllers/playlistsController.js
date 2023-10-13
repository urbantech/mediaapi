const { Playlist } = require('../models'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management
 */

// Controller to create a new Playlist entry
/**
 * @swagger
 * /playlist:
 *   post:
 *     summary: Create a new Playlist entry
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Playlist entry
 */
const createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const playlistEntry = await Playlist.create({ name, userId });
    res.status(201).json(playlistEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Playlist entry' });
  }
};

// Controller to get a Playlist entry by ID
/**
 * @swagger
 * /playlist/{id}:
 *   get:
 *     summary: Get a Playlist entry by ID
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Playlist entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       '404':
 *         description: Playlist entry not found
 *       '500':
 *         description: Internal server error
 */
const getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const playlistEntry = await Playlist.findByPk(playlistId);
    if (playlistEntry) {
      res.status(200).json(playlistEntry);
    } else {
      res.status(404).json({ error: 'Playlist entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Playlist entry by ID
/**
 * @swagger
 * /playlist/{id}:
 *   put:
 *     summary: Update a Playlist entry by ID
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Playlist entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       '404':
 *         description: Playlist entry not found
 *       '500':
 *         description: Internal server error
 */
const updatePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { name, userId } = req.body;
    const updatedPlaylist = await Playlist.update(
      { name, userId },
      {
        where: { id: playlistId },
        returning: true,
      }
    );
    if (updatedPlaylist[0] === 1) {
      res.status(200).json(updatedPlaylist[1][0]);
    } else {
      res.status(404).json({ error: 'Playlist entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Playlist entry by ID
/**
 * @swagger
 * /playlist/{id}:
 *   delete:
 *     summary: Delete a Playlist entry by ID
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Playlist entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Playlist entry not found
 *       '500':
 *         description: Internal server error
 */
const deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const deletedRows = await Playlist.destroy({
      where: { id: playlistId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Playlist entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
