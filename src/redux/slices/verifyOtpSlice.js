import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VERIFYOTPRESET } from "../../api";

export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      console.log("🔐 Verifying OTP for:", otpData);

      const response = await axios.post(VERIFYOTPRESET, otpData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      console.log("✅ OTP Verification Response:", response.data);

      // ✅ Store token persistently
      const token = response.data.token || response.data.accessToken;
      if (token) {
        await AsyncStorage.setItem("vendorToken", token);
      }

      return response.data;
    } catch (error) {
      console.log("❌ OTP Verification Error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to verify OTP, please try again";

      return rejectWithValue(message);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user || action.payload.data;
        state.token = action.payload.token || action.payload.accessToken;
        console.log("✅ OTP VERIFIED SUCCESSFULLY =>", action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        console.log("FAILED RESET PSW",action.payload)
      });
  },
});

export const { resetOtpVerifyState, clearError } = otpVerifySlice.actions;
export default otpVerifySlice.reducer;
