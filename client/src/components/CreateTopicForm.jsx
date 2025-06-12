import React, { useState } from 'react';
import axios from 'axios';
import './CreateTopicForm.css'
const CreateTopicForm = ({ serviceId }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('https://api.teploivanov.ru/api/topics', {
        title,
        serviceId,
      });
      alert('Тема успешно создана!');
      setTitle('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Ошибка при создании темы');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="topic-form-container">
      <h3 className="form-title">Создать новую тему</h3>
      
      {error && (
        <div className="error-message">
          <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="topic-form">
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название темы"
            className="form-input"
            required
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
  );
};

export default CreateTopicForm;