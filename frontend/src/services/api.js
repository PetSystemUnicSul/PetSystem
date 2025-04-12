import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petsystem-backendv1.onrender.com/', //Deploy
  // baseURL: 'http://localhost:3000', //Local
});

export default api;