// middleware/ratelimit.js

const rateLimit = require('express-rate-limit');

// Define rate-limiting options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

module.exports = limiter;
