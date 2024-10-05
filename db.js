const mongoose = require("mongoose");
require('dotenv').config()


const connectionToDb = () => {
  return mongoose
  // .connect("mongodb://localhost:27017/loginAuthentication", {
    .connect(process.env.MONGO_CONNECTION_URL,{
      serverSelectionTimeoutMS: 20000, // Increase the timeout to 20 seconds
    })
    .then(() => {
      console.log("Database connection established successfully.");
    })
    .catch((err) => {
      console.log("Error connecting to the database:", err.message); // Show meaningful error message
    });
};

module.exports = connectionToDb;
