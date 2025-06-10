import React from 'react';
import ServiceList from '../components/ServiceList';

const ServicesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Все услуги</h1>
      <ServiceList />
    </div>
  );
};

export default ServicesPage;