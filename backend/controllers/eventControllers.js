const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')


const createEvent = async (req, res) => {
  const { name, email, password, pic } = req.body;
  const newEvent = new Event({
    title: req.body.title,
    subtext: req.body.subtext,
    imageThumb: req.body.imageThumb,
    imageBanner: req.body.imageBanner,
    dates: req.body.dates,
    category: req.body.category,
    details: req.body.details,
    fee: req.body.fee,
    applyURL: req.body.applyURL,

    
    
});
try{

const savedEvent = await newEvent.save();
res.status(201).json(savedEvent);
}
catch(err){
res.status(500).json(err)
} 
};




const getEvent = async (req, res) => {
    Event.find({}).then(function (users) {
        res.send(users);
        });
       };






  module.exports = { createEvent,getEvent };