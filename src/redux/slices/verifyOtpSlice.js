// redux/slices/verifyOtpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {VERIFYOTPRESET} from "../../api"


// Async thunk for verifying OTP
export const verifyOtpReset = createAsyncThunk(
  "vendor/verifyOtpReset",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
       VERIFYOTPRESET,
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("✅ Verify OTP Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Verify OTP Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "OTP verification failed. Please try again" }
      );
    }
  }
);

// Slice
const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetVerifyOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtpReset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        console.log("OTP Verified Successfully =>", action.payload);
      })
      .addCase(verifyOtpReset.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "OTP verification failed";
        console.log("OTP Verification Failed =>", action.payload);
      });
  },
});

export const { resetVerifyOtpState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
