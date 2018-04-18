import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
});
instance.interceptors.request.use((config) => {
  config.headers['todo-access'] = localStorage.getItem('todo-token');
  return config;
});
export default instance;
