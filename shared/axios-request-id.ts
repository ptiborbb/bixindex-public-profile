import Axios from 'axios';
import { v4 } from 'uuid';

Axios.interceptors.request.use((config) => {
  config.headers['X-Request-ID'] = config.headers['X-Request-ID'] ?? v4();
  return config;
});
