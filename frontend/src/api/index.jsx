import axios from 'axios';


const api = axios.create({
  baseURL: 'https://wiseai-fub2.onrender.com/api',
  withCredentials: true
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;