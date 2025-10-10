import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {VERIFYOTP} from "../../api/index"

export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      console.log("🔐 Verifying OTP for:", otpData.phone);
      
      const response = await axios.post(VERIFYOTP, otpData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("✅ OTP Verification Response:", response.data);
      return response.data; // This returns the fulfilled action
      
    } catch (error) {
      console.log("❌ OTP Verification Error:", error);
      
      // Extract error message properly
      let errorMessage = "Failed to verify OTP, please try again";
      
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

const otpVerifySlice = createSlice({
  name: "otpVerify",
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    resetOtpVerifyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setOtpData: (state, action) => {
      state.phone = action.payload.phone;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload.user || action.payload.data;
        state.token = action.payload.token || action.payload.accessToken;
        console.log("OTP VERIFIED SUCCESSFULLY => ", action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // This comes from rejectWithValue
        state.user = null;
        state.token = null;
        console.log("OTP VERIFICATION FAILED => ", action.payload);
      });
  },
});

export const { resetOtpVerifyState, clearError, setOtpData } = otpVerifySlice.actions;
export default otpVerifySlice.reducer;