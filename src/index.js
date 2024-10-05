const express = require("express")
require('dotenv').config()
const AuthRoute = require('./components/Routes/AuthRoute/userAuth')
const app = express()
const UserAuthMiddleware = require('./components/MiddleWare/UserAuthToken.Middleware')
const DashboardRoute = require('./components/Routes/dashboard/dashboardRoute')
const connectionToDb = require('../db')

app.use(express.json())
    

app.use('/', AuthRoute)

app.use(UserAuthMiddleware)


app.use('/dashboard', DashboardRoute)

const PORT = process.env.PORT 
app.listen(PORT , async ()=> {
    try{
        await connectionToDb()
        console.log("connection to db sucessfully")
    }catch(err){
        console.log("connection rejected")
    }
    console.log("Server Running on localHost 8080");
})