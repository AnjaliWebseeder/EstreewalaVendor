// redux/slices/resetPasswordSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {RESETPASSWORD} from "../../api/index"

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "vendor/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        RESETPASSWORD,
        resetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("✅ Reset Password Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Reset Password Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Password reset failed. Please try again" }
      );
    }
  }
);

// Slice
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        console.log("Password Reset Successfully =>", action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Password reset failed";
        console.log("Password Reset Failed =>", action.payload);
      });
  },
});

export const { resetPasswordState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
