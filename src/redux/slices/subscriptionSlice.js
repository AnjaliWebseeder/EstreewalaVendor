// redux/slices/subscriptionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { 
  SUBSCRIPTION_PLANS, 
  CREATE_SUBSCRIPTION, 
  VERIFY_SUBSCRIPTION,
  MY_SUBSCRIPTIONS 
} from "../../api"
import {getToken} from "../../utils/hooks/auth"

// Get subscription plans
export const getSubscriptionPlans = createAsyncThunk(
  "subscription/getPlans",
  async (_, { rejectWithValue, getState }) => {
    try {
     const token = getToken(getState);

      const response = await axios.get(SUBSCRIPTION_PLANS, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

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

// Create subscription order
export const createSubscription = createAsyncThunk(
  "subscription/create",
  async (subscriptionData, { rejectWithValue, getState }) => {
    try {
       const token = getToken(getState);

      const response = await axios.post(CREATE_SUBSCRIPTION, subscriptionData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

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

// Verify subscription payment
export const verifySubscription = createAsyncThunk(
  "subscription/verify",
  async (verificationData, { rejectWithValue, getState }) => {
    try {
         const token = getToken(getState);

      const response = await axios.post(VERIFY_SUBSCRIPTION, verificationData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

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

// Get my subscriptions
export const getMySubscriptions = createAsyncThunk(
  "subscription/getMySubscriptions",
  async (_, { rejectWithValue, getState }) => {
    try {
     const token = getToken(getState);

      const response = await axios.get(MY_SUBSCRIPTIONS, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

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
        // Refresh my subscriptions after successful verification
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