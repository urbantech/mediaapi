// middleware/auth.js

// Example: Authentication middleware using JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  // Add other authentication middleware functions here
};
