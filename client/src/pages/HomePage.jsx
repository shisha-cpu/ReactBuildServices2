import React, { useEffect, useState } from 'react';
import ServiceList from '../components/ServiceList';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './home.css';

const API_URL = 'http://localhost:5000/api';

const HomePage = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [latestTopics, setLatestTopics] = useState([]);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsRes = await axios.get(`${API_URL}/reviews/latest`);
        setLatestReviews(reviewsRes.data);

        const topicsRes = await axios.get(`${API_URL}/forum/topics/latest`);
        setLatestTopics(topicsRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных для главной страницы:', error);
      }
    };

    fetchData();
  }, []);
console.log(latestReviews);

const handleFeedbackChange = (e) => {
  const { name, value } = e.target;
  setFeedback(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleFeedbackSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);
}
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Добро пожаловать в Teplo-Ivanov</h1>
          <p className="hero-subtitle">Ваш надежный партнер в сфере теплоизоляционных услуг</p>
          <Link to="/services" className="cta-button">Наши услуги</Link>
        </div>
      </section>

      {/* Популярные услуги */}
      <section className="section services-section">
        <div className="section-header">
          <h2 className="section-title">Популярные услуги</h2>
          <p className="section-description">Качественные решения для вашего комфорта</p>
        </div>
        <ServiceList />
      </section>

      {/* Последние отзывы и Активные темы форума */}
      <div className="grid-section">
        {/* Последние отзывы */}
        <section className="section reviews-section">
          <div className="section-header">
            <h2 className="section-title">Последние отзывы</h2>
            <p className="section-description">Мнение наших клиентов</p>
          </div>
          <div className="reviews-grid">
            {latestReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">
                    {review.user?.name?.charAt(0) || 'А'}
                  </div>
                  <div className="review-author">
                    <strong>{review.user?.name || 'Аноним'}</strong>
                    <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <p className="review-text">"{review.text.slice(0, 120)}..."</p>
              </div>
            ))}
          </div>
        </section>

        {/* Активные темы форума */}
        <section className="section forum-section">
          <div className="section-header">
            <h2 className="section-title">Активные темы форума</h2>
            <p className="section-description">Присоединяйтесь к обсуждению</p>
          </div>
          <div className="topics-list">
            {latestTopics.map((topic) => (
              <Link to={`/forum/topic/${topic._id}`} key={topic._id} className="topic-item">
                <div className="topic-content">
                  <h3 className="topic-title">{topic.title}</h3>
                  <div className="topic-meta">
                    <span className="topic-author">{topic.author?.name || 'Аноним'}</span>
                    <span className="topic-date">{new Date(topic.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="topic-arrow">→</div>
              </Link>
            ))}
          </div>
          <Link to="/forum" className="section-link">Все темы →</Link>
        </section>
      </div>

      {/* Контакты */}
      <section className="section contact-section">
        <div className="section-header">
          <h2 className="section-title">Контакты</h2>
          <p className="section-description">Свяжитесь с нами удобным для вас способом</p>
        </div>
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3 className="contact-method">Телефон</h3>
            <p className="contact-info">+7 (999) 123-45-67</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3 className="contact-method">Email</h3>
            <p className="contact-info">info@teplo-ivanov.ru</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3 className="contact-method">Адрес</h3>
            <p className="contact-info">г. Москва, ул. Теплоизоляционная, д. 5</p>
          </div>
        </div>
      </section>
      <section className="section feedback-section">
        <div className="section-header">
          <h2 className="section-title">Обратная связь</h2>
          <p className="section-description">Задайте вопрос или оставьте заявку</p>
        </div>
        <form className="feedback-form" >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleFeedbackChange}
                className="form-input"
                placeholder="Иван Иванов"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleFeedbackChange}
                className="form-input"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Телефон</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={feedback.phone}
              onChange={handleFeedbackChange}
              className="form-input"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Сообщение</label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleFeedbackChange}
              className="form-textarea"
              rows="5"
              placeholder="Ваше сообщение..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
          {submitStatus === 'success' && (
            <div className="form-success">Спасибо! Ваше сообщение отправлено.</div>
          )}
          {submitStatus === 'error' && (
            <div className="form-error">Произошла ошибка. Пожалуйста, попробуйте позже.</div>
          )}
        </form>
      </section>
    </div>
  );
};

export default HomePage;