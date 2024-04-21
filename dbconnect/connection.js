/* This code is made by Anneshu Nag, Student ID: 2210994760 */

// Mongoose for the database connection
const mongoose = require('mongoose')

// Function to connect to MongoDB
async function connectMongoDb(url) {
    return mongoose.connect(url);
}

// Export the required function
module.exports = {
    connectMongoDb,
}