const { Search } = require('../models'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         query:
 *           type: string
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search management
 */

// Controller to create a new Search entry
/**
 * @swagger
 * /search:
 *   post:
 *     summary: Create a new Search entry
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Search'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Search entry
 */
const createSearch = async (req, res) => {
  try {
    const { query, userId } = req.body;
    const searchEntry = await Search.create({ query, userId });
    res.status(201).json(searchEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Search entry' });
  }
};

// Controller to get a Search entry by ID
/**
 * @swagger
 * /search/{id}:
 *   get:
 *     summary: Get a Search entry by ID
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Search entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Search'
 *       '404':
 *         description: Search entry not found
 *       '500':
 *         description: Internal server error
 */
const getSearchById = async (req, res) => {
  try {
    const searchId = req.params.id;
    const searchEntry = await Search.findByPk(searchId);
    if (searchEntry) {
      res.status(200).json(searchEntry);
    } else {
      res.status(404).json({ error: 'Search entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Search entry by ID
/**
 * @swagger
 * /search/{id}:
 *   put:
 *     summary: Update a Search entry by ID
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Search entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Search'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Search'
 *       '404':
 *         description: Search entry not found
 *       '500':
 *         description: Internal server error
 */
const updateSearch = async (req, res) => {
  try {
    const searchId = req.params.id;
    const { query, userId } = req.body;
    const updatedSearch = await Search.update(
      { query, userId },
      {
        where: { id: searchId },
        returning: true,
      }
    );
    if (updatedSearch[0] === 1) {
      res.status(200).json(updatedSearch[1][0]);
    } else {
      res.status(404).json({ error: 'Search entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Search entry by ID
/**
 * @swagger
 * /search/{id}:
 *   delete:
 *     summary: Delete a Search entry by ID
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Search entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Search entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteSearch = async (req, res) => {
  try {
    const searchId = req.params.id;
    const deletedRows = await Search.destroy({
      where: { id: searchId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Search entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSearch,
  getSearchById,
  updateSearch,
  deleteSearch,
};
