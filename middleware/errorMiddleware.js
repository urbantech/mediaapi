// middleware/error.js

// Example: Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  