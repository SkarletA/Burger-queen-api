const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

staffSchema.query.byRole = function(role) {
  return this.where({ role: new RegExp(role, 'i') });
};

const staff = mongoose.model('staff', staffSchema);
module.exports = staff;
