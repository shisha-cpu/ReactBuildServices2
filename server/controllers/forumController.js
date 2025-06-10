const ForumTopic = require('../models/ForumTopic');
const ForumComment = require('../models/ForumComment');

// Создание темы
const createTopic = async (req, res) => {
  const { title, serviceId, userId } = req.body;
  try {
    const topic = new ForumTopic({ title, author: userId, service: serviceId });
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Добавление комментария
const addComment = async (req, res) => {
  const { topicId, text, userId } = req.body;
  try {
    const comment = new ForumComment({ topic: topicId, author: userId, text });
    await comment.save();
    const topic = await ForumTopic.findById(topicId);
    topic.comments.push(comment._id);
    await topic.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Получение всех тем
const getAllTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find()
      .populate('author', 'name')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name' } });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получение темы по ID
const getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await ForumTopic.findById(id)
      .populate('author', 'name')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name' } });

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получение последних 4 тем
const getLatestTopics = async (req, res) => {
  try {
    const latestTopics = await ForumTopic.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate('author', 'name');
    res.status(200).json(latestTopics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получение тем пользователя
const getTopicsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const topics = await ForumTopic.find({ author: userId })
      .populate('author', 'name')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name' } });
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const checkTopicByName = async (req, res) => {
  const { title } = req.params;
  try {
    const topic = await ForumTopic.findOne({ title });
    res.json({ 
      exists: !!topic,
      topicId: topic?._id 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получение темы по ID услуги
const getTopicByServiceId = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const topic = await ForumTopic.findOne({ service: serviceId })
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' }
      });

    res.json({ 
      exists: !!topic,
      topicId: topic?._id,
      topic
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создание темы с первым комментарием
const createTopicWithFirstComment = async (title, serviceId, userId, commentText) => {
  const topic = new ForumTopic({ 
    title, 
    author: userId, 
    service: serviceId 
  });
  await topic.save();

  const comment = new ForumComment({ 
    topic: topic._id, 
    author: userId, 
    text: commentText 
  });
  await comment.save();

  topic.comments.push(comment._id);
  await topic.save();

  return topic;
};
const createTopicWithComment = async (req, res) => {
  const { title, serviceId, userId, commentText } = req.body;
  try {
    const topic = await createTopicWithFirstComment(title, serviceId, userId, commentText);
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { 
  createTopic, 
  createTopicWithComment,
  addComment, 
  getAllTopics, 
  getTopicById, 
  getLatestTopics, 
  getTopicsByUser,
  getTopicByServiceId,
  checkTopicByName,
  createTopicWithFirstComment
};