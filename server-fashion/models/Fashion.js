const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  detail: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Fashion = mongoose.model('Fashion', fashionSchema, 'Fashion');
module.exports = Fashion;
