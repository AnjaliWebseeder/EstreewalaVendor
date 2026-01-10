import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearGlobalAuth } from '../utils/context/vendorContext';

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ ALWAYS read token fresh
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');

    console.log('🔐 Axios token:', !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    console.log('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userDetails');
      clearGlobalAuth();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
