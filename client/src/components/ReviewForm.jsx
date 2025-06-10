import React, { useState } from 'react';
import { addReview } from '../api/api';
import { useSelector } from 'react-redux';
import './ReviewForm.css'
const ReviewForm = ({ serviceId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user.userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
    
      
      const response = await addReview(serviceId, { rating, text }, user._id);
      if (response) {
        alert('Отзыв оставлен успешно');
        setRating(5);
        setText('');
        if (onReviewSubmitted) onReviewSubmitted();
      }
    } catch (err) {
      setError('Ошибка при отправке отзыва');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3 className="review-form-title">Оставить отзыв</h3>
      
      {error && (
        <div className="review-form-error">
          <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label className="form-label">Оценка</label>
          <div className="rating-select">
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))} 
              className="rating-input"
              disabled={isSubmitting}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} ★</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Текст отзыва</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="review-textarea"
            required
            disabled={isSubmitting}
            rows={5}
            placeholder="Поделитесь вашим мнением об услуге..."
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || !text.trim()}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;