import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REGISTER_SENDOTP, REGISTER_VERIFYOTP } from "../../api";

/* ================= SEND OTP ================= */
export const sendRegisterOtp = createAsyncThunk(
  "vendor/sendRegisterOtp",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("📤 SEND OTP PAYLOAD:", payload);

      const response = await axios.post(REGISTER_SENDOTP, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      console.log("✅ SEND OTP RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ SEND OTP ERROR:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to send OTP" }
      );
    }
  }
);

/* ================= VERIFY OTP ================= */
export const verifyRegisterOtp = createAsyncThunk(
  "vendor/verifyRegisterOtp",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("📤 VERIFY OTP PAYLOAD:", payload);

      const response = await axios.post(REGISTER_VERIFYOTP, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      console.log("✅ VERIFY OTP RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ VERIFY OTP ERROR:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "OTP verification failed" }
      );
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    success: false,
    error: null,
    otpSent: false,
  },
  reducers: {
    resetVendorState: state => {
      console.log("🔄 RESET SIGNUP STATE");
      state.loading = false;
      state.success = false;
      state.error = null;
      state.otpSent = false;
    },
  },
  extraReducers: builder => {
    builder
      /* SEND OTP */
      .addCase(sendRegisterOtp.pending, state => {
        console.log("⏳ SEND OTP PENDING");
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRegisterOtp.fulfilled, state => {
        console.log("🎉 SEND OTP SUCCESS");
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendRegisterOtp.rejected, (state, action) => {
        console.log("❌ SEND OTP FAILED:", action.payload);
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* VERIFY OTP */
      .addCase(verifyRegisterOtp.pending, state => {
        console.log("⏳ VERIFY OTP PENDING");
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegisterOtp.fulfilled, state => {
        console.log("🎉 VERIFY OTP SUCCESS");
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyRegisterOtp.rejected, (state, action) => {
        console.log("❌ VERIFY OTP FAILED:", action.payload);
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetVendorState } = signupSlice.actions;
export default signupSlice.reducer;
