import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ForumCreatePage.css'
const ForumCreatePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Пожалуйста, введите название темы');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/forum/topic', {
        title,
        serviceId: id,
        userId: user.userInfo._id
      });
      navigate(`/forum/service/${id}`);
    } catch (error) {
      console.error('Ошибка при создании топика', error);
      setError(error.response?.data?.message || 'Ошибка при создании темы');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forum-create-container">
      <div className="forum-create-card">
        <h1 className="forum-create-title">Создать новое обсуждение</h1>
        
        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleCreateTopic} className="forum-create-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Название темы</label>
            <input
              id="title"
              type="text"
              placeholder="Введите заголовок обсуждения"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Создание...
              </>
            ) : 'Создать тему'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForumCreatePage;