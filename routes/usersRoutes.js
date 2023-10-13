const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController')

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/user', UserController.createUser);
router.get('/user/:id', UserController.getUserById);
router.patch('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);



module.exports = router;

