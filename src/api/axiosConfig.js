// api/axiosConfig.js
import axios from 'axios';
import { getGlobalToken, clearGlobalAuth, addTokenListener } from "../utils/context/vendorContext"

// Create axios instance with base config
const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let currentToken = getGlobalToken();

// Listen for token changes
addTokenListener((token) => {
  currentToken = token;
});

// Request interceptor to automatically add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = currentToken || getGlobalToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Don't throw error here, let the server handle unauthorized requests
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
    return response;
  },
  (error) => {
    console.log('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth
      clearGlobalAuth();
      
      // You can add navigation to login screen here
      // Example: navigation.navigate('Login');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;