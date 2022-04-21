const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },

    subtext: {
      type: String,
      required: true,
    },
    imageThumb: {
      type: String,
      required: true,
    },
    imageBanner: {
      type: String,
      required: true,
    },
    dates: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
        type: String,
        required: true,
      },
    fee: {
        type: String,
        required: true,
      },
      applyURL: {
        type: String,
        required: true,
      }, 

  },
  {
    timestamps: true,
  }
);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;