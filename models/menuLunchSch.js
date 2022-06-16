const mongoose = require('mongoose');

const menuLunchSchema = new mongoose.Schema({
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
});

const menuLunch = mongoose.model('menuLunch', menuLunchSchema);
module.exports = menuLunch;
