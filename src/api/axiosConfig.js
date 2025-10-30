// api/axiosConfig.js
import axios from 'axios';
import { getGlobalToken, clearGlobalAuth } from "../utils/context/vendorContext"

// Create axios instance with base config
const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getGlobalToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('🔐 Token added to request:', config.url);
    } else {
      // console.log('⚠️ No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Success:', response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth
      console.log('🔐 Authentication failed, clearing auth data');
      clearGlobalAuth();
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;