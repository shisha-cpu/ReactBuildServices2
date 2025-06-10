const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumTopic', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForumComment', forumCommentSchema);