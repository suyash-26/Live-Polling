import axios from 'axios';

// Create custom Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor: Add token and log
api.interceptors.request.use(
  (config) => {
    console.log(`Sending ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors and log
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      // Example: Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;