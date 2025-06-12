import axios from 'axios';

const API_URL = 'https://api.teploivanov.ru/api';


export const getServices = async () => {
  const response = await axios.get(`${API_URL}/services`);
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await axios.get(`${API_URL}/services/${id}`);
  return response.data;
};

export const addReview = async (serviceId, review , userId) => {
  const response = await axios.post(`${API_URL}/reviews`, { serviceId, ...review  , userId  });
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/register`, credentials);
  return response.data;
};