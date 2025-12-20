// redux/slices/vendorOnboardingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import {
  COMPLETIONSTATUS,
  GETMULTISTEPONBOARDINGSTEP1,
  GETMULTISTEPONBOARDINGSTEP2,
  GETMULTISTEPONBOARDINGSTEP3,
  GETMULTISTEPONBOARDINGSTEP4,
  GETMULTISTEPONBOARDINGSTEP5,
  MULTISTEPONBOARDINGSTEP1,
  MULTISTEPONBOARDINGSTEP2,
  MULTISTEPONBOARDINGSTEP3,
  MULTISTEPONBOARDINGSTEP4,
  MULTISTEPONBOARDINGSTEP5,
} from '../../api';

// Get completion status - NO TOKEN PARAMS NEEDED!
export const getCompletionStatus = createAsyncThunk(
  'vendorOnboarding/getCompletionStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(COMPLETIONSTATUS);
      return response.data;
    } catch (error) {
      console.log(
        '❌ Completion Status Error:',
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data || { message: 'Failed to get status' },
      );
    }
  },
);

// Step 1: Business Details - NO TOKEN PARAMS NEEDED!
export const completeStep1 = createAsyncThunk(
  'vendorOnboarding/completeStep1',
  async (stepData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        MULTISTEPONBOARDINGSTEP1,
        stepData,
      );
      console.log('STEP DATA IS---------->', stepData, response);
      return response.data;
    } catch (error) {
      console.log('❌ Step 1 Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to complete step 1' },
      );
    }
  },
);

// Step 2: Owner Details (Multipart) - NO TOKEN PARAMS NEEDED!
export const completeStep2 = createAsyncThunk(
  'vendorOnboarding/completeStep2',
  async (stepData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('owners', JSON.stringify(stepData.owners));

      // Handle file uploads
      stepData.owners.forEach((owner, index) => {
        if (owner.governmentId) {
          formData.append('governmentId', {
            uri: owner.governmentId.uri,
            type: owner.governmentId.type || 'image/jpeg',
            name:
              owner.governmentId.name ||
              `government_id_${Date.now()}_${index}.jpg`,
          });
        }
      });

      const response = await axiosInstance.put(
        MULTISTEPONBOARDINGSTEP2,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('✅ Step 2 Completed:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Step 2 Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to complete step 2' },
      );
    }
  },
);

// Step 3: Services - NO TOKEN PARAMS NEEDED!
export const completeStep3 = createAsyncThunk(
  'vendorOnboarding/completeStep3',
  async (stepData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        MULTISTEPONBOARDINGSTEP3,
        stepData,
      );

      console.log('✅ Step 3 Completed:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Step 3 Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to complete step 3' },
      );
    }
  },
);

// Step 4: Pricing - NO TOKEN PARAMS NEEDED!
export const completeStep4 = createAsyncThunk(
  'vendorOnboarding/completeStep4',
  async (stepData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        MULTISTEPONBOARDINGSTEP4,
        stepData,
      );

      console.log('✅ Step 4 Completed:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Step 4 Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to complete step 4' },
      );
    }
  },
);

// Step 5: Delivery Methods - NO TOKEN PARAMS NEEDED!
export const completeStep5 = createAsyncThunk(
  'vendorOnboarding/completeStep5',
  async (stepData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        MULTISTEPONBOARDINGSTEP5,
        stepData,
      );

      console.log('✅ Step 5 Completed:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Step 5 Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to complete step 5' },
      );
    }
  },
);

export const getStep1 = createAsyncThunk(
  'vendorOnboarding/getStep1',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GETMULTISTEPONBOARDINGSTEP1);

      console.log('✅ Step 1 Get data:', res.data);

      // ✅ RETURN ONLY BUSINESS DATA
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch step 1' },
      );
    }
  },
);

export const getStep2 = createAsyncThunk(
  'vendorOnboarding/getStep2',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GETMULTISTEPONBOARDINGSTEP2);

      console.log('✅ Step 2 Get data:', res.data);

      // ✅ RETURN ONLY REQUIRED DATA
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch step 2' },
      );
    }
  },
);

export const getStep3 = createAsyncThunk(
  'vendorOnboarding/getStep3',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GETMULTISTEPONBOARDINGSTEP3);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch step 3' },
      );
    }
  },
);

export const getStep4 = createAsyncThunk(
  'vendorOnboarding/getStep4',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GETMULTISTEPONBOARDINGSTEP4);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch step 4' },
      );
    }
  },
);

export const getStep5 = createAsyncThunk(
  'vendorOnboarding/getStep5',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GETMULTISTEPONBOARDINGSTEP5);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch step 5' },
      );
    }
  },
);

const vendorOnboardingSlice = createSlice({
  name: 'vendorOnboarding',
  initialState: {
    completionStatus: null,
    currentStep: 0,
    loading: false,
    error: null,
    success: false,

    stepData: {
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      step5: null,
    },
  },
  reducers: {
    resetOnboardingState: state => {
      state.completionStatus = null;
      state.currentStep = 0;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearOnboardingError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Get Completion Status
      .addCase(getCompletionStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.completionStatus = action.payload;
        state.currentStep = action.payload.completionStep || 0;
        state.success = true;
      })
      .addCase(getCompletionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || 'Failed to get completion status';
      })
      // Step 1
      .addCase(completeStep1.pending, state => {
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
        state.error = action.payload?.message || 'Step 1 failed';
      })
      // Step 2
      .addCase(completeStep2.pending, state => {
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
        state.error = action.payload?.message || 'Step 2 failed';
      })
      // Step 3
      .addCase(completeStep3.pending, state => {
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
        state.error = action.payload?.message || 'Step 3 failed';
      })
      // Step 4
      .addCase(completeStep4.pending, state => {
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
        state.error = action.payload?.message || 'Step 4 failed';
      })
      // Step 5
      .addCase(completeStep5.pending, state => {
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
        state.error = action.payload?.message || 'Step 5 failed';
      })

      // GET STEP 1
      .addCase(getStep1.fulfilled, (state, action) => {
        state.stepData.step1 = action.payload;
      })

      // GET STEP 2
      .addCase(getStep2.fulfilled, (state, action) => {
        state.stepData.step2 = action.payload;
      })

      // GET STEP 3
      .addCase(getStep3.fulfilled, (state, action) => {
        state.stepData.step3 = action.payload;
      })

      // GET STEP 4
      .addCase(getStep4.fulfilled, (state, action) => {
        state.stepData.step4 = action.payload;
      })

      // GET STEP 5
      .addCase(getStep5.fulfilled, (state, action) => {
        state.stepData.step5 = action.payload;
      });
  },
});

export const { resetOnboardingState, setCurrentStep, clearOnboardingError } =
  vendorOnboardingSlice.actions;
export default vendorOnboardingSlice.reducer;
