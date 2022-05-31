const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const getOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ cid: req.body.cid });
    res.json(orders);
  });

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
  });



const newOrder = async (req, res) => {
  const newOrder = new Order({
    pickupcity: req.body.pickupcity,
    pickupaddress: req.body.pickupaddress,
    deliverycity: req.body.deliverycity,
    deliveryaddress: req.body.deliveryaddress,
    packagetype: req.body.packagetype,
    cid: req.body.cid,
    weight: req.body.weight,
    length: req.body.length,
    height: req.body.height,
    width: req.body.width,
    cost: req.body.cost
    
    
});
try{

const savedOrder = await newOrder.save();

res.status(201).json({savedOrder});
}
catch(err){
res.status(500).json(err)
}


};

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    order.pickupaddress = req.body.name || order.pickupaddress;
      order.deliveryaddress = req.body.email || order.deliveryaddress;

    const updatedOrder = await order.save();

    res.json({
      pickupaddress: updatedOrder.pickupaddress,
      deliveryaddress: updatedOrder.deliveryaddress,
    });
  } else {
    res.status(404).json("Order Not Found");
  }
});


const updateOrderStatus = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.body.id);
    if (order) {
        order.status = req.body.status;
    
        const updatedOrder = await order.save();
        res.status(201).json({updatedOrder});
      }
  
    
});





  module.exports = { newOrder, getOrder, updateOrderStatus};