import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5065', // Hardcoded base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
