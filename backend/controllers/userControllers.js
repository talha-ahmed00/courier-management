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

res.status(201).json({savedUser});
}
catch(err){
res.status(500).json(err)
} 
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: jwt.sign({
        id: updatedUser._id
      }, "talha",{expiresIn:"1d"}),
    });
  } else {
    res.status(404).json("User Not Found");
  }
});


const authUser = async (req, res) => {
  try{    
    const user = await User.findOne({username: req.body.username});
    //await user.matchPassword(req.body.password) && !res.status(401).json("Wrong Credentials");
    if(await user.matchPassword(req.body.password)){
    const{password, ...others}=user._doc;

    const token = jwt.sign({
      id: user._id
  }, "talha",{expiresIn:"1d"})
    //const token = generateToken(user._id);
    res.status(200).json({...others, token});
    } else{
      res.status(200).json("Wrong Credentials");
      
    }

}
catch(err){
    res.status(200).json("Wrong Credentials");
}
}





  module.exports = { registerUser,authUser, updateUserProfile };