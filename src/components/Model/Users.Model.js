const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    userName: { required: true, type: String },
    password: { required: true, type: String }, 
},{
    versionKey:false,
    timestamps:true
});

// Create the model from the schema
const UsersModel = mongoose.model('User', UserSchema);

// Export the model
module.exports = UsersModel;
