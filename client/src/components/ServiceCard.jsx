import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css'
const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-card-image">
        {service.img ? (
          <img src={service.img} alt={service.name} />
        ) : (
          <div className="service-card-image-placeholder">
            <svg className="placeholder-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="service-card-content">
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-description">{service.description}</p>
        
        <div className="service-card-rating">
          <svg className="rating-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{service.averageRating?.toFixed(1) || 'Нет оценок'}</span>
        </div>
        
        <Link to={`/services/${service._id}`} className="service-card-link">
          Подробнее
          <svg className="link-arrow" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;