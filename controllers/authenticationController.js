// controllers/authenticationController.js

// Import necessary modules and dependencies
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const { validationResult } = require('express-validator');


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Login with username and password to obtain a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful, returns a JWT token.
 *       401:
 *         description: Authentication failed.
 *       500:
 *         description: Internal server error.
 */



// Example: User login controller
const login = (req, res) => {
  // Perform user authentication and return a JWT token on successful login
  const { username, password } = req.body;

  // Example: Check user credentials (replace with your authentication logic)
  if (username === 'exampleuser' && password === 'password123') {
    // User authentication successful
    const user = { username: 'exampleuser' };

    // Create and sign a JWT token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with a unique username and email.
 *     tags: [Authentication]
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
 *       201:
 *         description: Registration successful, returns a JWT token.
 *       400:
 *         description: Invalid input data, user already exists, or other registration errors.
 *       500:
 *         description: Internal server error.
 */


// Example: User registration controller
const register = (req, res) => {
  // Perform user registration (replace with your registration logic)
  // ...
  const { username, email, password } = req.body;

  // Example: Validate user input (you can use express-validator for this)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Example: Check if the user already exists (replace with your database query)
  const userExists = false; // Replace with your logic

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Example: Create a new user (replace with your database insertion logic)
  // ...

  // User registration successful
  const user = { username, email };

  // Create and sign a JWT token
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ token });
  // Return appropriate response
};

// Export the controller functions
module.exports = {
  login,
  register,
};
