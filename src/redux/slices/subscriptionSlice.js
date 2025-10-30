// redux/slices/subscriptionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";
import { 
  SUBSCRIPTION_PLANS, 
  CREATE_SUBSCRIPTION, 
  VERIFY_SUBSCRIPTION,
  MY_SUBSCRIPTIONS 
} from "../../api"

// Get subscription plans - NO TOKEN PARAMS NEEDED!
export const getSubscriptionPlans = createAsyncThunk(
  "subscription/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(SUBSCRIPTION_PLANS);
      console.log("✅ Subscription Plans Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Subscription Plans Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription plans"
      );
    }
  }
);

// Create subscription order - NO TOKEN PARAMS NEEDED!
export const createSubscription = createAsyncThunk(
  "subscription/create",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(CREATE_SUBSCRIPTION, subscriptionData);
      console.log("✅ Create Subscription Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Create Subscription Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subscription"
      );
    }
  }
);

// Verify subscription payment - NO TOKEN PARAMS NEEDED!
export const verifySubscription = createAsyncThunk(
  "subscription/verify",
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(VERIFY_SUBSCRIPTION, verificationData);
      console.log("✅ Verify Subscription Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Verify Subscription Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

// Get my subscriptions - NO TOKEN PARAMS NEEDED!
export const getMySubscriptions = createAsyncThunk(
  "subscription/getMySubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(MY_SUBSCRIPTIONS);
      console.log("✅ My Subscriptions Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ My Subscriptions Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscriptions"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: null,
    mySubscriptions: [],
    currentOrder: null,
    loading: false,
    creating: false,
    verifying: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSubscriptionState: (state) => {
      state.loading = false;
      state.creating = false;
      state.verifying = false;
      state.error = null;
      state.success = false;
      state.currentOrder = null;
    },
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Plans
      .addCase(getSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.plans;
        state.success = true;
      })
      .addCase(getSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Subscription
      .addCase(createSubscription.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.creating = false;
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      // Verify Subscription
      .addCase(verifySubscription.pending, (state) => {
        state.verifying = true;
        state.error = null;
      })
      .addCase(verifySubscription.fulfilled, (state, action) => {
        state.verifying = false;
        state.success = true;
        state.currentOrder = null;
      })
      .addCase(verifySubscription.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload;
      })
      // Get My Subscriptions
      .addCase(getMySubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMySubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.mySubscriptions = action.payload.subscriptions || [];
        state.success = true;
      })
      .addCase(getMySubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  resetSubscriptionState, 
  clearSubscriptionError, 
  setCurrentOrder,
  clearCurrentOrder 
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;