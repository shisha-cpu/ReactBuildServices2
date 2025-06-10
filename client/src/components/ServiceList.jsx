import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { getServices } from '../api/api';
import './ServiceList.css'
const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [sortType, setSortType] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await getServices();
        setServices(data);
        sortServices('popularity', data); // Сортировка сразу после загрузки
      } catch (error) {
        console.error("Ошибка при загрузке услуг:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const sortServices = (type, servicesToSort = services) => {
    let sortedServices = [...servicesToSort];
    switch (type) {
      case 'popularity':
        sortedServices.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'rating':
        sortedServices.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'alphabet':
        sortedServices.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setServices(sortedServices);
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortType(value);
    sortServices(value);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка услуг...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p>Нет доступных услуг</p>
      </div>
    );
  }

  return (
    <div className="services-container">
      <div className="services-header">
        <h2 className="services-title">Наши услуги</h2>
        <div className="sort-control">
          <label htmlFor="sort" className="sort-label">Сортировка:</label>
          <select 
            id="sort" 
            value={sortType} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="popularity">По популярности</option>
            <option value="rating">По рейтингу</option>
            <option value="alphabet">По алфавиту</option>
          </select>
        </div>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;