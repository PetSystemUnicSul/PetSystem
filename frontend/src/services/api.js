import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petsystem-backend.onrender.com/', // produção
  // baseURL: 'http://localhost:3000', // desenvolvimento
});

export default api;