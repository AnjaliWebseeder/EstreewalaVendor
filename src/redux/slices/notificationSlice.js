import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import {UPDATE_FCM_API} from "../../api/index"

export const updateFcmToken = createAsyncThunk(
  'auth/updateFcmToken',
  async (fcmToken, { getState, rejectWithValue }) => {
    try {
      console.log('📨 Updating FCM Token:', fcmToken);
       const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axiosInstance.post(
        UPDATE_FCM_API,
        { fcmToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ FCM Token updated successfully:', response.data);
      return response.data;

    } catch (error) {
      console.log('❌ Update FCM Token Error:', error);

      let errorMessage = 'Failed to update FCM token';

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

