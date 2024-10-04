const mongoose = require("mongoose");

const connectionToDb = () => {
  return mongoose
    .connect("mongodb://localhost:27017/loginAuthentication", {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection established successfully.");
    })
    .catch((err) => {
      console.log("Error connecting to the database:", err.message); // Show meaningful error message
    });
};

module.exports = connectionToDb;
