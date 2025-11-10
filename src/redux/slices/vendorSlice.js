import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axiosConfig"
import {GET_VENDORDETAILS} from "../../api"

// Async thunk to get vendor details
export const getVendorDetails = createAsyncThunk(
  'vendor/getVendorDetails',
  async (_, { rejectWithValue }) => {
    try {
      console.log('👤 Fetching vendor details...');
      
      const response = await axiosInstance.get(
       GET_VENDORDETAILS,
        {
          timeout: 10000,
        }
      );

      console.log('✅ Vendor Details Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.log('❌ Get Vendor Details Error:', error);

      let errorMessage = 'Failed to fetch vendor details';

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

// Async thunk to update vendor name only
export const updateVendorName = createAsyncThunk(
  'vendor/updateVendorName',
  async (name, { rejectWithValue }) => {
    try {
      console.log('🔄 Updating vendor name:', name);
      
      const updateData = { name: name.trim() };
      
      const response = await axiosInstance.patch(
        GET_VENDORDETAILS,
        updateData,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Vendor Name Update Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.log('❌ Update Vendor Name Error:', error);

      let errorMessage = 'Failed to update name';

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

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    // Vendor data
    vendorData: null,
    
    // Loading states
    loading: false,
    updatingName: false,
    
    // Error states
    error: null,
    updateNameError: null,
    
    // Success states
    updateNameSuccess: false,
  },
  reducers: {
    // Reset vendor state
    resetVendorState: (state) => {
      state.vendorData = null;
      state.loading = false;
      state.updatingName = false;
      state.error = null;
      state.updateNameError = null;
      state.updateNameSuccess = false;
    },
    
    // Clear errors
    clearVendorErrors: (state) => {
      state.error = null;
      state.updateNameError = null;
    },
    
    // Clear update success
    clearUpdateNameSuccess: (state) => {
      state.updateNameSuccess = false;
    },
    
    // Update vendor name locally (for immediate UI updates)
    updateVendorNameLocally: (state, action) => {
      if (state.vendorData) {
        state.vendorData.name = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Vendor Details
      .addCase(getVendorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorData = action.payload;
        state.error = null;
      })
      .addCase(getVendorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.vendorData = null;
      })
      
      // Update Vendor Name
      .addCase(updateVendorName.pending, (state) => {
        state.updatingName = true;
        state.updateNameError = null;
        state.updateNameSuccess = false;
      })
      .addCase(updateVendorName.fulfilled, (state, action) => {
        state.updatingName = false;
        state.vendorData = action.payload;
        state.updateNameError = null;
        state.updateNameSuccess = true;
      })
      .addCase(updateVendorName.rejected, (state, action) => {
        state.updatingName = false;
        state.updateNameError = action.payload;
        state.updateNameSuccess = false;
      });
  },
});

export const {
  resetVendorState,
  clearVendorErrors,
  clearUpdateNameSuccess,
  updateVendorNameLocally,
} = vendorSlice.actions;

export default vendorSlice.reducer;