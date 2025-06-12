import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfilePage.css'
const API_URL = 'https://api.teploivanov.ru/api';

const ProfilePage = () => {
  const user = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [userTopics, setUserTopics] = useState([]);
  const [activeTab, setActiveTab] = useState('reviews');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserActivity = async () => {
      setIsLoading(true);
      try {
        const [reviewsRes, topicsRes] = await Promise.all([
          axios.get(`${API_URL}/reviews/user/${user._id}`),
          axios.get(`${API_URL}/forum/user/${user._id}`)
        ]);
        setUserReviews(reviewsRes.data);
        setUserTopics(topicsRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке активности пользователя:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user._id) {
      fetchUserActivity();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/'); 
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <div className="user-avatar">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="user-info">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-number">{userReviews.length}</span>
              <span className="stat-label">Отзывов</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userTopics.length}</span>
              <span className="stat-label">Тем</span>
            </div>
          </div>
        </div>
      </header>

      {/* Actions Section */}
      <div className="profile-actions">
        {/* <button className="action-button edit-button">
          <svg className="action-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Редактировать
        </button>
        <button className="action-button password-button">
          <svg className="action-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Сменить пароль
        </button> */}
        <button 
          onClick={handleLogout}
          className="action-button logout-button"
        >
          <svg className="action-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Выйти
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Мои отзывы
        </button>
        <button 
          className={`tab-button ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          Мои темы
        </button>
      </nav>

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      ) : (
        <div className="profile-content">
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              {userReviews.length > 0 ? (
                <div className="reviews-grid">
                  {userReviews.map((review) => (
                    <div key={review._id} className="review-card">
                      <div className="review-header">
                        <h3 className="review-service">{review.service?.title || 'Неизвестная услуга'}</h3>
                        <div className="review-rating">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                      <div className="review-footer">
                        <span className="review-date">
                          {new Date(review.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <Link 
                          to={`/services/${review.service?._id}`} 
                          className="review-link"
                        >
                          Посмотреть услугу →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Вы не оставили ни одного отзыва.</p>
                  <Link to="/services" className="browse-link">
                    Посмотреть услуги →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Topics Tab */}
          {activeTab === 'topics' && (
            <div className="topics-section">
              {userTopics.length > 0 ? (
                <div className="topics-list">
                  {userTopics.map((topic) => (
                    <Link 
                      to={`/forum/topic/${topic._id}`} 
                      key={topic._id} 
                      className="topic-card"
                    >
                      <h3 className="topic-title">{topic.title}</h3>
                      <div className="topic-meta">
                        <span className="topic-comments">
                          💬 {topic.comments?.length || 0} комментариев
                        </span>
                        <span className="topic-date">
                          {new Date(topic.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Вы не создали ни одной темы на форуме.</p>
                  <Link to="/forum" className="browse-link">
                    Перейти на форум →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;