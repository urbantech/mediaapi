const Reward  = require('../models/rewardModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     Reward:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         points:
 *           type: integer
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Reward
 *   description: Reward management
 */

// Controller to create a new Reward entry
/**
 * @swagger
 * /reward:
 *   post:
 *     summary: Create a new Reward entry
 *     tags: [Reward]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reward'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the Reward entry
 */
const createReward = async (req, res) => {
  try {
    const { points, userId } = req.body;
    const rewardEntry = await Reward.create({ points, userId });
    res.status(201).json(rewardEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the Reward entry' });
  }
};

// Controller to get a Reward entry by ID
/**
 * @swagger
 * /reward/{id}:
 *   get:
 *     summary: Get a Reward entry by ID
 *     tags: [Reward]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Reward entry to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *       '404':
 *         description: Reward entry not found
 *       '500':
 *         description: Internal server error
 */
const getRewardById = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const rewardEntry = await Reward.findByPk(rewardId);
    if (rewardEntry) {
      res.status(200).json(rewardEntry);
    } else {
      res.status(404).json({ error: 'Reward entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a Reward entry by ID
/**
 * @swagger
 * /reward/{id}:
 *   put:
 *     summary: Update a Reward entry by ID
 *     tags: [Reward]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Reward entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reward'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *       '404':
 *         description: Reward entry not found
 *       '500':
 *         description: Internal server error
 */
const updateReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const { points, userId } = req.body;
    const updatedReward = await Reward.update(
      { points, userId },
      {
        where: { id: rewardId },
        returning: true,
      }
    );
    if (updatedReward[0] === 1) {
      res.status(200).json(updatedReward[1][0]);
    } else {
      res.status(404).json({ error: 'Reward entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a Reward entry by ID
/**
 * @swagger
 * /reward/{id}:
 *   delete:
 *     summary: Delete a Reward entry by ID
 *     tags: [Reward]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Reward entry to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Reward entry not found
 *       '500':
 *         description: Internal server error
 */
const deleteReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const deletedRows = await Reward.destroy({
      where: { id: rewardId },
    });
    if (deletedRows === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Reward entry not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReward,
  getRewardById,
  updateReward,
  deleteReward,
};
