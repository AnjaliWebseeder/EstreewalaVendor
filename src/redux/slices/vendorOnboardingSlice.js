// redux/slices/vendorOnboardingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMPLETIONSTATUS, MULTISTEPONBOARDINGSTEP1, MULTISTEPONBOARDINGSTEP2, MULTISTEPONBOARDINGSTEP3, MULTISTEPONBOARDINGSTEP4, MULTISTEPONBOARDINGSTEP5 } from "../../api"
import {getToken} from "../../utils/hooks/auth"


// Get completion status
export const getCompletionStatus = createAsyncThunk(
  "vendorOnboarding/getCompletionStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.get(
        COMPLETIONSTATUS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      return response.data;
    } catch (error) {
      console.log("❌ Completion Status Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to get status" }
      );
    }
  }
);

// Step 1: Business Details
export const completeStep1 = createAsyncThunk(
  "vendorOnboarding/completeStep1",
  async (stepData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.put(
        MULTISTEPONBOARDINGSTEP1,
        stepData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      return response.data;
    } catch (error) {
      console.log("❌ Step 1 Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete step 1" }
      );
    }
  }
);

// Step 2: Owner Details (Multipart)
export const completeStep2 = createAsyncThunk(
  "vendorOnboarding/completeStep2",
  async (stepData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState); // get vendor token
      if (!token) throw new Error("No authentication token found");

      const formData = new FormData();
      formData.append('owners', JSON.stringify(stepData.owners));

      stepData.owners.forEach((owner) => {
        if (owner.governmentId) {
          formData.append('governmentId', {
            uri: owner.governmentId.uri,
            type: owner.governmentId.type || 'image/jpeg',
            name: owner.governmentId.name || `government_id_${Date.now()}.jpg`,
          });
        }
      });

      const response = await axios.put(
        MULTISTEPONBOARDINGSTEP2,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000,
        }
      );

      console.log("✅ Step 2 Completed:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Step 2 Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete step 2" }
      );
    }
  }
);


// Step 3: Services
export const completeStep3 = createAsyncThunk(
  "vendorOnboarding/completeStep3",
  async (stepData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.put(
        MULTISTEPONBOARDINGSTEP3,
        stepData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log("✅ Step 3 Completed:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Step 3 Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete step 3" }
      );
    }
  }
);

// Step 4: Pricing
export const completeStep4 = createAsyncThunk(
  "vendorOnboarding/completeStep4",
  async (stepData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.put(
        MULTISTEPONBOARDINGSTEP4,
        stepData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log("✅ Step 4 Completed:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Step 4 Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete step 4" }
      );
    }
  }
);

// Step 5: Delivery Methods
export const completeStep5 = createAsyncThunk(
  "vendorOnboarding/completeStep5",
  async (stepData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.put(
        MULTISTEPONBOARDINGSTEP5,
        stepData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log("✅ Step 5 Completed:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Step 5 Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete step 5" }
      );
    }
  }
);

const vendorOnboardingSlice = createSlice({
  name: "vendorOnboarding",
  initialState: {
    completionStatus: null,
    currentStep: 0,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOnboardingState: (state) => {
      state.completionStatus = null;
      state.currentStep = 0;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearOnboardingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Completion Status
      .addCase(getCompletionStatus.fulfilled, (state, action) => {
        state.completionStatus = action.payload;
        state.currentStep = action.payload.completionStep || 0;
      })
      // Step 1
      .addCase(completeStep1.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeStep1.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStep = 1;
      })
      .addCase(completeStep1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Step 1 failed";
      })
      // Step 2
      .addCase(completeStep2.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeStep2.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStep = 2;
      })
      .addCase(completeStep2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Step 2 failed";
      })
      // Step 3
      .addCase(completeStep3.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeStep3.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStep = 3;
      })
      .addCase(completeStep3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Step 3 failed";
      })
      // Step 4
      .addCase(completeStep4.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeStep4.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStep = 4;
      })
      .addCase(completeStep4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Step 4 failed";
      })
      // Step 5
      .addCase(completeStep5.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeStep5.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStep = 5;
      })
      .addCase(completeStep5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Step 5 failed";
      });
  },
});

export const { resetOnboardingState, setCurrentStep, clearOnboardingError } = vendorOnboardingSlice.actions;
export default vendorOnboardingSlice.reducer;