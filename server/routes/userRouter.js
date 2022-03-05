const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const expressAsyncHandler = require('express-async-handler')
const {genrateToken} = require('../utilities/utils')
const userRouter = express.Router();
// post request for signining users
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user= await User.findOne({email:req.body.email})
    if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){ // if password mateches
              res.send({
                      _id:user._id,
                      name:user.name,
                      email:user.email,
                      token:genrateToken(user)
              });
              return;
            }
    }
    res.status(401).send({message:'Invalid Email or Password'})
   })
   );
   
   //post route for signup
   userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
           const user= await User.findOne({email:req.body.email})
           if(user){
                   res.status(401).send({message:'User already exits'})
                        
           }else{
                   const newUser = User({
                           name:req.body.name,
                           email:req.body.email,
                           password:bcrypt.hashSync(req.body.password,10)
                   });
                   const user =await newUser.save();
                   res.send({
                      _id:user._id,
                      name:user.name,
                      eamil:user.email,
                      token:genrateToken(user),
   
                   })
           }
        
   })
   
   );
   
module.exports=userRouter;