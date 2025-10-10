// redux/slices/otpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENDOTP } from "../../api";

export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async (phoneData, { rejectWithValue }) => {
    try {
      console.log("📞 Sending OTP to:", phoneData.phone);
      
      const response = await axios.post(SENDOTP, phoneData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ OTP API Response:", response.data);
      return response.data; // This returns the fulfilled action
      
    } catch (error) {
      console.log("❌ OTP API Error:", error);
      
      // Extract error message properly
      let errorMessage = "Failed to send OTP, please try again";
      
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

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    phone: null,
  },
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.phone = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        console.log("OTP SENT SUCCESSFULLY => ", action.payload);
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // This comes from rejectWithValue
        console.log("OTP SEND FAILED => ", action.payload);
      });
  },
});

export const { resetOtpState, clearError, setPhone } = otpSlice.actions;
export default otpSlice.reducer;