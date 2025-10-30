// utils/hooks/auth.js
import { getGlobalToken, getGlobalUserDetails } from '../../context/VendorContext';

// For Redux async thunks (legacy support if needed)
export const getToken = () => {
  const token = getGlobalToken();
  if (!token) {
    console.log('❌ No token found in global auth');
    throw new Error('No authentication token found');
  }
  return token;
};

// For components
export const useAuth = () => {
  const token = getGlobalToken();
  const userDetails = getGlobalUserDetails();
  
  return {
    token,
    userDetails,
    isAuthenticated: !!token,
  };
};