// config/db.js

// const { Sequelize, DataTypes  } = require('sequelize');

// // Replace the following with your PostgreSQL database credentials
// const dbConfig ={
//   dialect: 'postgres',
//   host: 'localhost', // Your database host
//   // port: 5432, // Your database port
//   username: 'postgres', // Your database username
//   password: 'Harsh304@', // Your database password
//   database: 'mytestdb', // Your database name
// }

// const sequelize = new Sequelize(dbConfig);

// // module.exports =  new Sequelize({
// //     dialect: 'postgres',
// //     host: 'localhost', // Your database host
// //     port: 5432, // Your database port
// //     username: 'postgres', // Your database username
// //     password: 'Harsh304@', // Your database password
// //     database: 'mytestdb', // Your database name
// //   });


// // Test the database connection
// async function testDatabaseConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// // testDatabaseConnection() ; 

// // console.log(" this is sequelize object" , sequelize)

// // Import your model files (e.g., User, Video) and initialize them here
// // const User = sequelize.define('../models/userModel'); // Example model import
// // const Video = sequelize.import('../models/videoModel'); // Add other models as needed

// // Define associations between models (e.g., User.hasMany(Video))

// // Synchronize the models with the database (creates tables if they don't exist)
// // sequelize.sync();

// // Export the database connection and models
// module.exports = {
//   sequelize,
// //   User, // Export models so you can use them in your controllers
//   // Video, // Add other models as needed
//   testDatabaseConnection,
// };

const { Sequelize, DataTypes } = require('sequelize');

// Replace the following with your PostgreSQL database credentials
const dbConfig = {
  dialect: 'postgres',
  host: '127.0.0.1', // Your database host
  username: 'postgres', // Your database username
  password: 'Harsh304@', // Your database password
  database: 'mytestdb', // Your database name
}

const sequelize = new Sequelize(dbConfig);

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Import your model files (e.g., User, Video) and initialize them here
// For example, if you have a User model in 'userModel.js':
// const User = require('./userModel')(sequelize, DataTypes);

// Define associations between models (e.g., User.hasMany(Video))

// Synchronize the models with the database (creates tables if they don't exist)
// sequelize.sync();

// Export the database connection and models
module.exports = {
  sequelize,
  // User, // Export models so you can use them in your controllers
  // Video, // Add other models as needed
  testDatabaseConnection,
};
