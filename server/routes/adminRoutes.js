const express = require('express');
const {
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
} = require('../controllers/adminController');

const router = express.Router();

// Получение всех сущностей
router.get('/users', getAllUsers);
router.get('/reviews', getAllReviews);
router.get('/forum/topics', getAllForumTopics);
router.get('/forum/comments', getAllForumComments);
router.get('/services', getAllServices);

// Удаление сущностей
router.delete('/review/:id', deleteReview);
router.delete('/forum/topic/:id', deleteForumTopic);
router.delete('/forum/comment/:id', deleteForumComment);
router.delete('/service/:id', deleteService);
router.delete('/user/:id', deleteUser);

module.exports = router;
