import React, { useEffect, useState } from 'react';
import './AdminPanelPage.css'
const API_URL = 'https://api.teploivanov.ru/api';

const AdminPanelPage = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const [isLoading, setIsLoading] = useState(true);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    img: '',
    price: ''
  });

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [servicesRes, reviewsRes, topicsRes, commentsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/admin/services`).then(r => r.json()),
        fetch(`${API_URL}/admin/reviews`).then(r => r.json()),
        fetch(`${API_URL}/admin/forum/topics`).then(r => r.json()),
        fetch(`${API_URL}/admin/forum/comments`).then(r => r.json()),
        fetch(`${API_URL}/admin/users`).then(r => r.json())
      ]);

      setServices(servicesRes);
      setReviews(reviewsRes);
      setTopics(topicsRes);
      setComments(commentsRes);
      setUsers(usersRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntity = async (type, id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) return;
    
    try {
      const res = await fetch(`${API_URL}/admin/${type}/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!res.ok) throw new Error('Ошибка при удалении');
      fetchAll();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Не удалось удалить элемент');
    }
  };

  const handleServiceChange = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/services/service`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Ошибка при добавлении услуги');
      }

      setNewService({ name: '', description: '', img: '', price: '' });
      fetchAll();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1 className="admin-title">Административная панель</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-number1">{services.length}</span>
            <span className="stat-label1">Услуг</span>
          </div>
          <div className="stat-card">
            <span className="stat-number1">{users.length}</span>
            <span className="stat-label1">Пользователей</span>
          </div>
          <div className="stat-card">
            <span className="stat-number1">{reviews.length}</span>
            <span className="stat-label1">Отзывов</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {/* Navigation Tabs */}
        <nav className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Услуги
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Отзывы
          </button>
          <button 
            className={`tab-button ${activeTab === 'forum' ? 'active' : ''}`}
            onClick={() => setActiveTab('forum')}
          >
            Форум
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Пользователи
          </button>
        </nav>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Загрузка данных...</p>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="tab-content">
            <section className="admin-section">
              <h2 className="section-title">Добавить новую услугу</h2>
              <form onSubmit={handleAddService} className="service-form">
                <div className="form-group">
                  <label>Название услуги</label>
                  <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleServiceChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Описание</label>
                  <textarea
                    name="description"
                    value={newService.description}
                    onChange={handleServiceChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>URL изображения</label>
                    <input
                      type="text"
                      name="img"
                      value={newService.img}
                      onChange={handleServiceChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Цена (руб)</label>
                    <input
                      type="number"
                      name="price"
                      value={newService.price}
                      onChange={handleServiceChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  Добавить услугу
                </button>
              </form>
            </section>

            <section className="admin-section">
              <h2 className="section-title">Список услуг ({services.length})</h2>
              <div className="entity-list">
                {services.map(service => (
                  <div key={service._id} className="entity-card">
                    <div className="entity-info">
                      <h3>{service.name}</h3>
                      <p className="entity-description">{service.description}</p>
                      <div className="entity-meta">
                        <span className="price-tag">{service.price} руб.</span>
                        {service.img && (
                          <a href={service.img} target="_blank" rel="noopener noreferrer" className="image-link">
                            Изображение
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntity('service', service._id)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content">
            <section className="admin-section">
              <h2 className="section-title">Отзывы ({reviews.length})</h2>
              <div className="entity-list">
                {reviews.map(review => (
                  <div key={review._id} className="entity-card">
                    <div className="entity-info">
                      <div className="review-header">
                        <div className="user-avatar">
                          {review.user?.name?.charAt(0) || 'А'}
                        </div>
                        <div>
                          <h3>{review.user?.name || 'Анонимный пользователь'}</h3>
                          <div className="rating-stars">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                      <div className="entity-meta">
                        <span>{new Date(review.date).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntity('review', review._id)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="tab-content">
            <section className="admin-section">
              <h2 className="section-title">Темы форума ({topics.length})</h2>
              <div className="entity-list">
                {topics.map(topic => (
                  <div key={topic._id} className="entity-card">
                    <div className="entity-info">
                      <h3>{topic.title}</h3>
                      <div className="entity-meta">
                        <span>Автор: {topic.author?.name || 'Аноним'}</span>
                        <span>{new Date(topic.date).toLocaleString()}</span>
                        <span>Комментариев: {topic.commentsCount || 0}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntity('forum/topic', topic._id)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="admin-section">
              <h2 className="section-title">Комментарии ({comments.length})</h2>
              <div className="entity-list">
                {comments.map(comment => (
                  <div key={comment._id} className="entity-card">
                    <div className="entity-info">
                      <div className="comment-header">
                        <div className="user-avatar small">
                          {comment.author?.name?.charAt(0) || 'А'}
                        </div>
                        <h3>{comment.author?.name || 'Аноним'}</h3>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <div className="entity-meta">
                        <span>{new Date(comment.date).toLocaleString()}</span>
                        {comment.topic && (
                          <span>Тема: {comment.topic.title}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntity('forum/comment', comment._id)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="tab-content">
            <section className="admin-section">
              <h2 className="section-title">Пользователи ({users.length})</h2>
              <div className="entity-list">
                {users.map(user => (
                  <div key={user._id} className="entity-card">
                    <div className="entity-info">
                      <div className="user-header">
                        <div className="user-avatar large">
                          {user.name?.charAt(0) || user.email.charAt(0)}
                        </div>
                        <div>
                          <h3>{user.name || 'Без имени'}</h3>
                          <p className="user-email">{user.email}</p>
                          <div className="user-meta">
                            <span>Роль: {user.role || 'user'}</span>
                            <span>Зарегистрирован: {new Date(user.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntity('user', user._id)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanelPage;