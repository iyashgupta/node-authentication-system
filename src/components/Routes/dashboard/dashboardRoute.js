const { Router } = require('express')

const DashBoardRouter = Router()


DashBoardRouter.get('/user', async (req,res) => {
    try{
         res.status(200).send({ message: 'Imaportant Dashboard Data is here',status:true}) 
        }catch(err){
            res.status(500).send({ message: 'Internal Server Error' , status:false}) 
    }
})


module.exports= DashBoardRouter