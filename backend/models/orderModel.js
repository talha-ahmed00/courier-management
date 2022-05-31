const mongoose = require("mongoose")
const orderSchema = mongoose.Schema(
    {
      pickupcity:{
        type: String,
        required: true,
      },
  
      pickupaddress: {
        type: String,
        required:true,
      },
      deliverycity: {
        type: String,
        required: true,
      },
      deliveryaddress: {
        type: String,
      },
      packagetype: {
        type: String,
        enum: ['Silver', 'Gold', 'Platinum'],
        required: true,
        default: 'Silver',
      },
      cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
      },
      status: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Delivery Depot', 'Out For Delivery', 'Delivered','Cancelled'],
        required: true,
        default: 'Booked',
      },
      weight: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      
    },
    {
      timestamps: true,
    }
  );
  

const Order = mongoose.model('Order', orderSchema);

module.exports =  Order;