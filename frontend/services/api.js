import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petsystem-backend.onrender.com/', //Deploy
  // baseURL: 'http://localhost:3000', //Local
});

export default api;