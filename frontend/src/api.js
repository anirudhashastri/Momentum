import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy will forward this to Flask
});

export default api;