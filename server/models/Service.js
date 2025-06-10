const mongoose = require('mongoose');
const { type } = require('os');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img : {type : String , require :true},
  price:{type : String},
  description: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Service', serviceSchema);