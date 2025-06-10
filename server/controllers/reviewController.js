const Review = require('../models/Review');
const Service = require('../models/Service');

// Добавление отзыва
const addReview = async (req, res) => {
  const { serviceId, rating, text, userId } = req.body;
  console.log(userId);
  
  try {
    const review = new Review({ service: serviceId, user: userId, rating, text });
    await review.save();

    // Получаем все отзывы для пересчета рейтинга
    const reviews = await Review.find({ service: serviceId });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Обновляем услугу
    const service = await Service.findByIdAndUpdate(
      serviceId,
      {
        averageRating,
        reviewsCount: reviews.length
      },
      { new: true }
    );

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Получение отзывов пользователя
const getReviewsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ user: id }).populate('service', 'title');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Получение отзывов по услуге
const getReviewsByService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const reviews = await Review.find({ service: serviceId })
      .populate('user', 'name') // Добавляем populate для поля user, выбираем только имя
      .exec();
    
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Получение последних 4 отзывов
const getLatestReviews = async (req, res) => {
  try {
    const latestReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate('user', 'name');
    res.status(200).json(latestReviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addReview, getReviewsByUser, getReviewsByService, getLatestReviews };
