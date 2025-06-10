const express = require('express');
const { 
  createTopic, 
  addComment, 
  getAllTopics, 
  getTopicById, 
  getLatestTopics, 
  getTopicsByUser,
  getTopicByServiceId,
  checkTopicByName,
  createTopicWithComment
} = require('../controllers/forumController');
const router = express.Router();

// Создание темы
router.post('/topic', createTopic);
// Добавление комментария
router.post('/comment', addComment);
// Получение всех тем
router.get('/topics', getAllTopics);
// Получение темы по ID
router.get('/topic/:id', getTopicById);
// Получение последних 4 тем
router.get('/topics/latest', getLatestTopics);
// Получение тем пользователя
router.get('/user/:userId', getTopicsByUser);
// Получение темы по ID услуги
router.get('/service/:serviceId', getTopicByServiceId);
// Проверка темы по названию
router.get('/topic-by-name/:title', checkTopicByName);

router.post('/topic-with-comment', createTopicWithComment);
module.exports = router;