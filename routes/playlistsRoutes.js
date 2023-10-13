const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/playlistsController')
/**
 * @swagger
 * /playlists/create:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Playlist created successfully
 */
router.post('/create', PlaylistController.createPlaylist);
router.get('/create/:id', PlaylistController.getPlaylistById);
router.patch('/create/:id', PlaylistController.updatePlaylist);
router.delete('/create/:id', PlaylistController.deletePlaylist);

module.exports = router;

