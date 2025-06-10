const Review = require('../models/Review');
const ForumTopic = require('../models/ForumTopic');
const ForumComment = require('../models/ForumComment');
const Service = require('../models/Service');
const User = require('../models/User');

// --- Получение всех пользователей ---
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // без пароля
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Получение всех отзывов ---
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'name').populate('service', 'title');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Получение всех тем форума ---
const getAllForumTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find()
      .populate('author', 'name')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name' } });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Получение всех комментариев ---
const getAllForumComments = async (req, res) => {
  try {
    const comments = await ForumComment.find().populate('author', 'name').populate('topic', 'title');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Получение всех сервисов ---
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Удаление сущностей (уже было) ---
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    res.json({ message: 'Review deleted', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteForumTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await ForumComment.deleteMany({ topic: id });
    const topic = await ForumTopic.findByIdAndDelete(id);
    res.json({ message: 'Topic deleted', topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteForumComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await ForumComment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted', comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    res.json({ message: 'Service deleted', service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getAllReviews,
  getAllForumTopics,
  getAllForumComments,
  getAllServices,
  deleteReview,
  deleteForumTopic,
  deleteForumComment,
  deleteService,
  deleteUser
};
