const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
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

// menuSchema.query.byRole = (name) => this.where({ name: new RegExp(name, 'i') });

const menu = mongoose.model('menu', menuSchema);
module.exports = menu;
