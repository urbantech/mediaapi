const User  = require('../models/userModel'); // Import your Sequelize models

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profilePicture:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

// Controller to create a new User
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Error creating the User
 */
const createUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const user = await User.create({ username, email, password, profilePicture });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating the User' });
  }
};

// Controller to get a User by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a User by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the User to get
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a User by ID
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a User by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the User to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
const updateUser = async (req) => {
  try {
    const userId = req.params.id;
    const { username, email, password, profilePicture } = req.body;
    const updatedUser = await User.update(
      { username, email, password, profilePicture },
      {
        where: { id: userId },
        returning: true,
      }
    );
    if (updatedUser[0] === 1) {
      return updatedUser[1][0];
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Internal server error');
  }
};

// Controller to delete a User by ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a User by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the User to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
const deleteUser = async (req) => {
  try {
    const userId = req.params.id;
    const deletedRows = await User.destroy({
      where: { id: userId },
    });
    if (deletedRows === 1) {
      return;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Internal server error');
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
