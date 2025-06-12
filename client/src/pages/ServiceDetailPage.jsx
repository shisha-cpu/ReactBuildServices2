import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ServiceDetailPage.css';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { getServiceById } from '../api/api';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [forumTopicId, setForumTopicId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const user = useSelector(state => state.user.userInfo);
  const isProfileComplete = user && user.name;

  useEffect(() => {
    const fetchServiceAndReviews = async () => {
      setIsLoading(true);
      try {
        const serviceData = await getServiceById(id);
        setService(serviceData);

        const reviewsResponse = await axios.get(`https://api.teploivanov.ru/api/reviews/service/${id}`);
        setReviews(reviewsResponse.data);

        const forumResponse = await axios.get(`https://api.teploivanov.ru/api/forum/service/${id}`);
        if (forumResponse.data.exists) {
          setForumTopicId(forumResponse.data.topicId);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchServiceAndReviews();
    }
  }, [id]);

  useEffect(() => {
    const sorted = [...reviews].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    setSortedReviews(sorted);
  }, [reviews, sortOption]);

  const handleCreateDiscussion = async () => {
    if (!isProfileComplete) {
      setAuthError('Для создания обсуждения необходимо указать имя в профиле');
      return;
    }

    if (!commentText.trim()) {
      setAuthError('Комментарий не может быть пустым');
      return;
    }

    try {
      const checkForumResponse = await axios.get(
        `https://api.teploivanov.ru/api/forum/topic-by-name/${service.name}`
      );
      
      let topicId;
      if (checkForumResponse.data.exists) {
        topicId = checkForumResponse.data.topicId;
      } else {
        const topicResponse = await axios.post('https://api.teploivanov.ru/api/forum/topic', {
          title: service.name,
          serviceId: service._id,
          userId: user._id
        });
        topicId = topicResponse.data._id;
      }

      await axios.post('https://api.teploivanov.ru/api/forum/comment', {
        topicId,
        text: commentText,
        userId: user._id
      });

      setForumTopicId(topicId);
      setCommentText('');
      setAuthError('');
    } catch (error) {
      console.error('Ошибка при создании обсуждения:', error);
      setAuthError('Ошибка при создании обсуждения');
    }
  };

  const handleReviewSubmitted = async () => {
    if (!isProfileComplete) {
      setAuthError('Для оставления отзыва необходимо указать имя в профиле');
      return;
    }

    try {
      if (!forumTopicId && user && service) {
        const forumResponse = await axios.get(`https://api.teploivanov.ru/api/forum/service/${id}`);
        if (!forumResponse.data.exists) {
          const topicResponse = await axios.post('https://api.teploivanov.ru/api/forum/topic', {
            title: service.name,
            serviceId: service._id,
            userId: user._id
          });
          setForumTopicId(topicResponse.data._id);
        }
      }

      const reviewsResponse = await axios.get(`https://api.teploivanov.ru/api/reviews/service/${id}`);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Ошибка при создании топика:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-container">
        <h2>Услуга не найдена</h2>
        <p>Запрашиваемая услуга не существует или была удалена.</p>
        <Link to="/services" className="back-link">
          Вернуться к списку услуг
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail-container">
      <div className="service-header">
        <img 
          src={service.img || 'https://via.placeholder.com/400x300'} 
          alt={service.name} 
          className="service-image"
        />
        <div className="service-info">
          <h1 className="service-title">{service.name}</h1>
          <div className="service-price">{service.price} ₽</div>
          <p className="service-description">{service.description}</p>
        </div>
      </div>

      <div className="reviews-section">
        <div className="section-header">
          <h2 className="section-title">Отзывы</h2>
          <div className="sort-control">
            <label className="sort-label">Сортировать:</label>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="sort-select"
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
              <option value="highest">Сначала с высокой оценкой</option>
              <option value="lowest">Сначала с низкой оценкой</option>
            </select>
          </div>
        </div>

        {isProfileComplete ? (
          <ReviewForm 
            serviceId={service._id} 
            onReviewSubmitted={handleReviewSubmitted} 
          />
        ) : (
          <div className="auth-required">
            {user ? (
              <p>Чтобы оставить отзыв, пожалуйста, <Link to="/login">авторизуйтесь</Link></p>
            ) : (
              <p>Чтобы оставить отзыв, пожалуйста, <Link to="/login">авторизуйтесь</Link></p>
            )}
          </div>
        )}

        <ReviewList reviews={sortedReviews} />
      </div>

      <div className="forum-section">
        <h2 className="section-title">Обсуждение услуги</h2>
        {authError && <div className="error-message">{authError}</div>}
        
        {forumTopicId ? (
          <Link to={`/forum/topic/${forumTopicId}`} className="forum-link">
            Перейти к обсуждению на форуме
          </Link>
        ) : (
          <div>
            <p>Обсуждение этой услуги еще не начато.</p>
            {isProfileComplete ? (
              <>
                <textarea
                  className="discussion-input"
                  placeholder="Напишите первый комментарий..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <button
                  onClick={handleCreateDiscussion}
                  className="create-button"
                  disabled={!commentText.trim()}
                >
                  Создать обсуждение
                </button>
              </>
            ) : (
              <div className="auth-required">
                {user ? (
                  <p>Чтобы начать обсуждение, пожалуйста, <Link to="/login">укажите имя в профиле</Link></p>
                ) : (
                  <p>Чтобы начать обсуждение, пожалуйста, <Link to="/login">авторизуйтесь</Link></p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailPage;