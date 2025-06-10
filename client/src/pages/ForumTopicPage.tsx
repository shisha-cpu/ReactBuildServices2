import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './ForumTopicPage.css';

const ForumTopicPage = () => {
  const { id } = useParams();
  const user = useSelector(state => state.user.userInfo);
  const isProfileComplete = user && user.name;
  const [topic, setTopic] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopic = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/forum/topic/${id}`);
        setTopic(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке темы:", error);
        setError('Не удалось загрузить тему');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  const handleAddComment = async () => {
    if (!isProfileComplete) {
      setError('Для добавления комментария укажите имя в профиле');
      return;
    }

    if (!commentText.trim()) {
      setError('Пожалуйста, введите текст комментария');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/forum/comment', {
        topicId: id,
        text: commentText,
        userId: user._id
      });

      setCommentText('');
      const response = await axios.get(`http://localhost:5000/api/forum/topic/${id}`);
      setTopic(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      setError('Ошибка при отправке комментария');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="forum-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка темы...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="forum-error">
        <h2>Тема не найдена</h2>
        <p>{error || 'Запрашиваемая тема не существует или была удалена.'}</p>
      </div>
    );
  }

  return (
    <div className="forum-topic-container">
      <div className="forum-topic-header">
        <h1 className="forum-topic-title">{topic.title}</h1>
        <div className="forum-topic-meta">
          <span className="forum-topic-author">
            <span className="author-avatar">
              {topic.author?.name?.charAt(0) || 'А'}
            </span>
            {topic.author?.name || 'Неизвестный автор'}
          </span>
          <span className="forum-topic-date">
            {new Date(topic.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="forum-comment-form">
        <h3 className="form-title">Добавить комментарий</h3>
        {error && (
          <div className="form-error">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        {isProfileComplete ? (
          <>
            <textarea
              className="comment-input"
              placeholder="Напишите ваш комментарий..."
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              rows={4}
            />
            <button
              onClick={handleAddComment}
              disabled={isSubmitting || !commentText.trim()}
              className="submit-button"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить комментарий'}
            </button>
          </>
        ) : (
          <div className="auth-required">
            {user ? (
              <p>Чтобы оставить комментарий, пожалуйста, <Link to="/login">укажите имя в профил1е</Link></p>
            ) : (
              <p>Чтобы оставить комментарий, пожалуйста, <Link to="/login">авторизуйтесь</Link></p>
            )}
          </div>
        )}
      </div>

      <div className="forum-comments">
        <h3 className="comments-title">
          Комментарии ({topic.comments.length})
        </h3>
        
        {topic.comments.length === 0 ? (
          <div className="empty-comments">
            <p>Пока нет комментариев. Будьте первым!</p>
          </div>
        ) : (
          <div className="comments-list">
            {topic.comments.map((comment) => (
              <div key={comment._id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-author">
                    <span className="author-avatar">
                      {comment.author?.name?.charAt(0) || 'А'}
                    </span>
                    <span className="author-name">
                      {comment.author?.name || 'Аноним'}
                    </span>
                  </div>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="comment-content">
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumTopicPage;