import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { BASE_URL } from '../../api';

/* -------------------- 1️⃣ Get Orders by Status -------------------- */
export const fetchVendorOrders = createAsyncThunk(
  'vendorOrders/fetchByStatus',
  async (status, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const url = `${BASE_URL}/vendors/order?status=${status}`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      return { status, data: response.data.data };
    } catch (error) {
      console.log('❌ Fetch Vendor Orders Error:', error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch vendor orders';
      return rejectWithValue(msg);
    }
  },
);

/* -------------------- 2️⃣ Get Order Summary -------------------- */
export const fetchOrderSummary = createAsyncThunk(
  'vendorOrders/fetchSummary',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const url = `${BASE_URL}/vendors/orders/${orderId}/summary`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      return response.data.order;
    } catch (error) {
      console.log('❌ Fetch Order Summary Error:', error);
      let msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch order summary';
      return rejectWithValue(msg);
    }
  },
);

/* -------------------- 3️⃣ Update Order Status -------------------- */
export const updateOrderStatus = createAsyncThunk(
  'vendorOrders/updateStatus',
  async ({ orderId, status, reason }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;


      if (!token) throw new Error('No token found. Please log in again.');

      const finalReason =
        status === 'rejected'
          ? reason || 'Order rejected by vendor'
          : reason;

      const payload = finalReason ? { status, reason: finalReason } : { status };

      const url = `${BASE_URL}/vendors/orders/${orderId}/status`;

      const response = await axiosInstance.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      return response.data?.order || response.data;
    } catch (error) {
      console.log('❌ Update Order Status Error:', error);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to update order status';
      return rejectWithValue(msg);
    }
  },
);

/* -------------------- Slice Definition -------------------- */
const vendorOrderSlice = createSlice({
  name: 'vendorOrders',
  initialState: {
    pendingOrders: [],
    acceptedOrders: [],
    rejectedOrders: [],
    completedOrders: [],
    orderSummary: null,
    loading: false,
    error: null,
    statusUpdateLoading: false,
  },
  reducers: {
    // NEW: Optimistic update for immediate UI changes
    optimisticallyUpdateOrderStatus: (state, action) => {
      const { orderId, newStatus, orderData } = action.payload;

      // Remove from all arrays first
      state.pendingOrders = state.pendingOrders.filter(order => order.id !== orderId);
      state.acceptedOrders = state.acceptedOrders.filter(order => order.id !== orderId);
      state.completedOrders = state.completedOrders.filter(order => order.id !== orderId);
      state.rejectedOrders = state.rejectedOrders.filter(order => order.id !== orderId);

      // Add to the appropriate array with updated status
      const updatedOrder = orderData ? { ...orderData, status: newStatus } : null;

      if (updatedOrder) {
        switch (newStatus) {
          case 'pending':
            state.pendingOrders.unshift(updatedOrder);
            break;
          case 'accepted':
            state.acceptedOrders.unshift(updatedOrder);
            break;
          case 'completed':
            state.completedOrders.unshift(updatedOrder);
            break;
          case 'rejected':
            state.rejectedOrders.unshift(updatedOrder);
            break;
        }
      }
    },
    resetVendorOrderState: state => {
      state.pendingOrders = [];
      state.acceptedOrders = [];
      state.rejectedOrders = [];
      state.completedOrders = [];
      state.orderSummary = null;
      state.loading = false;
      state.error = null;
      state.statusUpdateLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      /* Fetch Orders by Status */
      .addCase(fetchVendorOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.loading = false;
        const { status, data } = action.payload;
        if (status === 'pending') state.pendingOrders = data || [];
        else if (status === 'accepted') state.acceptedOrders = data || [];
        else if (status === 'rejected') state.rejectedOrders = data || [];
        else if (status === 'completed') state.completedOrders = data || [];
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Fetch Order Summary */
      .addCase(fetchOrderSummary.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.orderSummary = action.payload;
      })
      .addCase(fetchOrderSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Update Order Status */
      .addCase(updateOrderStatus.pending, state => {
        state.statusUpdateLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        const updatedOrder = action.payload;

        if (updatedOrder) {
          // Remove from all arrays
          state.pendingOrders = state.pendingOrders.filter(order => order.id !== updatedOrder.id);
          state.acceptedOrders = state.acceptedOrders.filter(order => order.id !== updatedOrder.id);
          state.completedOrders = state.completedOrders.filter(order => order.id !== updatedOrder.id);
          state.rejectedOrders = state.rejectedOrders.filter(order => order.id !== updatedOrder.id);

          // Add to correct array based on new status
          switch (updatedOrder.status) {
            case 'pending':
              state.pendingOrders.unshift(updatedOrder);
              break;
            case 'accepted':
              state.acceptedOrders.unshift(updatedOrder);
              break;
            case 'completed':
              state.completedOrders.unshift(updatedOrder);
              break;
            case 'rejected':
              state.rejectedOrders.unshift(updatedOrder);
              break;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { optimisticallyUpdateOrderStatus, resetVendorOrderState } = vendorOrderSlice.actions;
export default vendorOrderSlice.reducer;