const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController')

/**
 * @swagger
 * /search/videos:
 *   get:
 *     summary: Search videos by keyword
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results returned
 */


router.post('/videos', SearchController.createSearch );
router.get('/videos/:id', SearchController.getSearchById );
router.patch('/videos/:id', SearchController.updateSearch);
router.delete('/videos/:id', SearchController.deleteSearch );

module.exports = router;

