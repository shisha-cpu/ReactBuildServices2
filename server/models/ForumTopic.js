const mongoose = require('mongoose');

const forumTopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ForumComment' }]
});

module.exports = mongoose.model('ForumTopic', forumTopicSchema);