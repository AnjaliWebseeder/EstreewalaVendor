import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SIGNUP } from "../../api";

export const signupVendor = createAsyncThunk(
  "vendor/signupVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://www.api.estreewalla.com/api/v1/vendors",
        vendorData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // optional safety
        }
      );

      console.log("✅ Signup API Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Signup API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Signup failed, please try again" }
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
      .addCase(signupVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
        state.success = true;

        console.log("SIGNUP VENDOR IS => ",action.payload)
      })
      .addCase(signupVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        console.log("FAILED",action.payload)
      });
  },
});

export const { resetVendorState } = vendorSlice.actions;
export default vendorSlice.reducer;
