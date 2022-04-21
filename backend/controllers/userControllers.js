const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    pic: req.body.pic
    
    
});
try{

const savedUser = await newUser.save();
const token = jwt.sign({
  id: newUser._id
}, "talha",{expiresIn:"1d"})
res.status(201).json({savedUser, token});
}
catch(err){
res.status(500).json(err)
} 
};




const authUser = async (req, res) => {
  try{    
    const user = await User.findOne({username: req.body.username});
    !user && res.status(401).json("Wrong Credentials");
    //await user.matchPassword(req.body.password) && !res.status(401).json("Wrong Credentials");
    if(await user.matchPassword(req.body.password)){
    const{password, ...others}=user._doc;

    const token = jwt.sign({
      id: user._id
  }, "talha",{expiresIn:"1d"})
    //const token = generateToken(user._id);
    res.status(200).json({...others, token});
    } else{
      res.status(401).json("Wrong Credentials");
    }

}
catch(err){
    res.status(500).json(err);
}
}





  module.exports = { registerUser,authUser };