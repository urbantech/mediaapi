const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Video Distribution API',
      version: '1.0.0',
      description: 'API for a microservices powered digital distribution platform',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const videosRoutes = require('./routes/videosRoutes');
// ... import other routes as needed

// Use routes
app.use('/users', usersRoutes);
app.use('/videos', videosRoutes);
// ... use other routes as needed

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // for testing purposes

