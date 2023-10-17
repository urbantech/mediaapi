// utils/validator.js

const { body } = require('express-validator');

// Example: User registration input validation
const validateRegistration = [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Example: User login input validation
const validateLogin = [
  body('username').isString().withMessage('Username must be a string'),
  body('password').isString().withMessage('Password must be a string'),
];

// Add more validation functions as needed for different routes and input data

module.exports = {
  validateRegistration,
  validateLogin,
  // Add other validation functions here
};
