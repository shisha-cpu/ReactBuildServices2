import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-empty">

        <p>Пока нет отзывов</p>
      </div>
    );
  }
console.log(reviews);

  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <div className="review-header">
            <div className="review-author">
              <div className="review-avatar">
                {review.user?.name?.charAt(0) || 'А'}
              </div>
              <div>
                <span className="review-name">{review.user?.name || 'Аноним'}</span>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="review-rating">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
          </div>
          <div className="review-content">
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;