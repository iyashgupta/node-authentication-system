const { Router } = require("express");
require('dotenv').config()
const AuthRouter = Router();
const UserModel = require("../../Model/Users.Model");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

// login Api
AuthRouter.post("/auth/login",async (req, res) => {
  try{
    const { email ,password } = req.body
        
    if( !email || !password ){
        return res
        .status(400)
        .send({ message: "All Field Must Be Filled", status: false });
    }
     
    const isEmailExist = await UserModel.findOne({ email })

     if(!isEmailExist){
        return res
        .status(401)
        .send({ message: "Email Didn't Exist", status: false });
     }


     // Compare the provided password with the hashed password in the database
     const isPasswordMatched = await bcrypt.compare(password, isEmailExist.password);
     if (isPasswordMatched) {
       
       var token = jwt.sign({ email:isEmailExist.email }, process.env.JWT_SECRET);
       return res.status(200).send({
         message: "Login successful",
         status: true,
         token
       });
     }

    res.status(400).send({ message: "Invalid Credential", status:false})

  }catch(err){
    console.log("Error in LoginIn Api", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
});

// signUp Api
AuthRouter.post("/auth/signUp", async (req, res) => {
  try {
    const { name, mobileNumber, password, email } = req.body;

    if (!name || !mobileNumber || !password || !email) {
      return res
        .status(400)
        .send({ message: "All Field Must Be Filled", status: false });
    }

    // Check if user already exists
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return res
        .status(400)
        .send({ message: "Email ALready Exist", status: false });
    }

    const existingMobileNumberExist = await UserModel.findOne({ mobileNumber });
    if (existingMobileNumberExist) {
      return res
        .status(400)
        .send({ message: "Mobile Number already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new UserModel({ ...req.body, password: hashedPassword });

    await NewUser.save();

    res
      .status(200)
      .send({ message: "User Registered Sucessfully", status: true });
  } catch (err) {
    console.log("Error in SignUp Api", err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
});

module.exports = AuthRouter;
