const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      popularity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const order = mongoose.model('order', orderSchema);
module.exports = order;
