import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN } from "../../api";

export const loginVendor = createAsyncThunk(
  "vendor/loginVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN,
        vendorData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, 
        }
      );

      console.log("✅ Login API Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Login API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Login failed, please try again" }
      );
    }
  }
);


const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetVendorState: (state) => {
      state.vendor = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
        state.success = true;

        console.log("LOGIN VENDOR IS => ",action.payload)
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        console.log("FAILED",action.payload)
      });
  },
});

export const { resetVendorState } = vendorSlice.actions;
export default vendorSlice.reducer;
