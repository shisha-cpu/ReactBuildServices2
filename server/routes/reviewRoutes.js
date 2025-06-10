const express = require('express');
const { addReview, getReviewsByUser, getReviewsByService, getLatestReviews } = require('../controllers/reviewController');
const router = express.Router();

// Добавление отзыва
router.post('/', addReview);
// Получение отзывов по пользователю
router.get('/user/:id', getReviewsByUser);
// Получение отзывов по услуге
router.get('/service/:serviceId', getReviewsByService);

router.get('/latest', getLatestReviews);

module.exports = router;
