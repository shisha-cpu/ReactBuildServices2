import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ForumPage.css';

const ForumPage = () => {
  const [topics, setTopics] = useState([]);
  const [services, setServices] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [error, setError] = useState('');
  const user = useSelector(state => state.user.userInfo);
  const isProfileComplete = user && user.name;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forum/topics');
        setTopics(response.data);
      } catch (error) {
        console.error('Ошибка при получении тем:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Ошибка при получении услуг:', error);
      }
    };

    fetchTopics();
    fetchServices();
  }, []);

  const handleCreateTopic = async () => {
    if (!isProfileComplete) {
      setError('Для создания темы укажите имя в профиле');
      return;
    }

    if (!newTopicTitle.trim()) {
      setError('Заголовок темы не может быть пустым');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/forum/topic', {
        title: newTopicTitle,
        userId: user._id,
      });
      setTopics(prev => [...prev, { ...response.data, comments: [] }]);
      setNewTopicTitle('');
    } catch (error) {
      console.error('Ошибка при создании темы:', error);
      setError('Ошибка при создании темы');
    } finally {
      setIsCreating(false);
    }
  };

  const serviceNames = services.map(service => service.name.toLowerCase());
  const serviceTopics = topics.filter(topic => serviceNames.includes(topic.title.toLowerCase()));
  const generalTopics = topics.filter(topic => !serviceNames.includes(topic.title.toLowerCase()));

  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1 className="forum-title">Форум сообщества</h1>
        <p className="forum-description">Обсуждайте услуги, задавайте вопросы и делитесь опытом</p>
      </header>

      <nav className="forum-tabs">
        <button 
          className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Обсуждение услуг
        </button>
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Общие вопросы
        </button>
      </nav>

      <div className="create-topic-form">
        <h2 className="form-title">Создать новую тему</h2>
        {error && <div className="form-error">{error}</div>}
        <div className="input-group">
          <input
            type="text"
            placeholder="Введите заголовок темы"
            value={newTopicTitle}
            onChange={(event) => setNewTopicTitle(event.target.value)}
            className="topic-input"
          />
          {isProfileComplete ? (
            <button
              onClick={handleCreateTopic}
              disabled={!newTopicTitle.trim() || isCreating}
              className="create-button"
            >
              {isCreating ? 'Создание...' : 'Создать тему'}
            </button>
          ) : (
            <div className="auth-required">
              {user ? (
                <p>Для создания темы <Link to="/login">авторизуйтесь</Link></p>
              ) : (
                <p>Для создания темы <Link to="/login">авторизуйтесь</Link></p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="forum-content">
        {activeTab === 'services' ? (
          <div className="topics-section">
            <h2 className="section-title">
              Обсуждение услуг <span className="topics-count">{serviceTopics.length}</span>
            </h2>
            
            {serviceTopics.length === 0 ? (
              <div className="empty-state">
                <p>Пока нет обсуждений услуг. Будьте первым!</p>
                <Link to="/services" className="browse-link">
                  Посмотреть услуги →
                </Link>
              </div>
            ) : (
              <div className="topics-grid">
                {serviceTopics.map(topic => (
                  <Link to={`/forum/topic/${topic._id}`} key={topic._id} className="topic-card">
                    <div className="topic-main">
                      <h3 className="topic-title">{topic.title}</h3>
                      <p className="topic-excerpt">
                        {topic.comments?.[0]?.text?.slice(0, 100) || 'Нет комментариев...'}
                      </p>
                    </div>
                    <div className="topic-meta">
                      <div className="author-info">
                        <div className="author-avatar">
                          {topic.author?.name?.charAt(0) || 'А'}
                        </div>
                        <span>{topic.author?.name || 'Аноним'}</span>
                      </div>
                      <div className="stats">
                        <span className="comments-count">
                          💬 {topic.comments?.length || 0}
                        </span>
                        <span className="topic-date">
                          {new Date(topic.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="topics-section">
            <h2 className="section-title">
              Общие вопросы <span className="topics-count">{generalTopics.length}</span>
            </h2>
            
            {generalTopics.length === 0 ? (
              <div className="empty-state">
                <p>Пока нет общих вопросов. Создайте первую тему!</p>
              </div>
            ) : (
              <div className="topics-grid">
                {generalTopics.map(topic => (
                  <Link to={`/forum/topic/${topic._id}`} key={topic._id} className="topic-card">
                    <div className="topic-main">
                      <h3 className="topic-title">{topic.title}</h3>
                      <p className="topic-excerpt">
                        {topic.comments?.[0]?.text?.slice(0, 100) || 'Нет комментариев...'}
                      </p>
                    </div>
                    <div className="topic-meta">
                      <div className="author-info">
                        <div className="author-avatar">
                          {topic.author?.name?.charAt(0) || 'А'}
                        </div>
                        <span>{topic.author?.name || 'Аноним'}</span>
                      </div>
                      <div className="stats">
                        <span className="comments-count">
                          💬 {topic.comments?.length || 0}
                        </span>
                        <span className="topic-date">
                          {new Date(topic.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;