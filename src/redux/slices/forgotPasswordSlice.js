// redux/slices/forgotPasswordSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {FORGOTPASSWORD} from "../../api/index"

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    try {
      console.log("📧 Sending forgot password email to:", emailData.email);
      
      const response = await axios.post(FORGOTPASSWORD, emailData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ Forgot Password Response:", response.data);
      return response.data; // This returns the fulfilled action
      
    } catch (error) {
      console.log("❌ Forgot Password Error:", error);
      
      // Extract error message properly
      let errorMessage = "Failed to send reset email, please try again";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      console.log("Error message to dispatch:", errorMessage);
      
      // Return the error using rejectWithValue
      return rejectWithValue(errorMessage);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    resetToken: null,
  },
  reducers: {
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.resetToken = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.resetToken = action.payload.resetToken || action.payload.token;
        console.log("FORGOT PASSWORD EMAIL SENT SUCCESSFULLY => ", action.payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // This comes from rejectWithValue
        state.resetToken = null;
        console.log("FORGOT PASSWORD FAILED => ", action.payload);
      });
  },
});

export const { resetForgotPasswordState, clearError } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;