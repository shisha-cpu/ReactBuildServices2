const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);