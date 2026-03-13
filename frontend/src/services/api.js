import axios from 'axios';

// During development Vite proxy maps /api to localhost:8000
const API_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const detectFakeNews = async (data) => {
  const response = await api.post('/detect/', data);
  return response.data;
};

export const getHistory = async (skip = 0, limit = 50) => {
  const response = await api.get(`/history/?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats/');
  return response.data;
};
