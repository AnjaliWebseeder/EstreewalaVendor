import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';

// export const fetchVendorOrders = createAsyncThunk(
//   'vendorOrders/fetchByStatus',
//   async (status, { getState, rejectWithValue }) => {
//     try {
//       // ✅ Use getState() properly
//       const state = getState();

//       // ✅ Try to get token from either login or OTP verify slice
//       const token =
//         state?.login?.token ||
//         state?.otpVerify?.token ||
//         state?.vendor?.token || // optional fallback
//         null;

//       if (!token) throw new Error('No token found. Please log in again.');

//       const url = `https://api.estreewalla.com/api/v1/vendors/order?status=${status}`;
//       const response = await axiosInstance.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 10000,
//       });

//       console.log(`✅ Vendor Orders (${status}):`, response.data);
//       return { status, data: response.data.data };
//     } catch (error) {
//       console.log('❌ Fetch Vendor Orders Error:', error);
//       const msg =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message ||
//         'Failed to fetch vendor orders';
//       return rejectWithValue(msg);
//     }
//   },
// );

/* -------------------- 1️⃣ Get Orders by Status -------------------- */

export const fetchVendorOrders = createAsyncThunk(
  'vendorOrders/fetchByStatus',
  async (status, { getState, rejectWithValue }) => {
    try {
      // ✅ Get full Redux state
      const state = getState();

      // ✅ Try multiple token sources
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const url = `https://api.estreewalla.com/api/v1/vendors/order?status=${status}`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      // ✅ Detailed Logging for Debugging
      console.log(
        `\n📦 FETCHED VENDOR ORDERS (${status.toUpperCase()})`,
        '\nURL:', url,
        '\n-----------------------------------',
      );
      console.log('🔹 Full Response:', JSON.stringify(response.data, null, 2));

      // Optional: quickly preview the first order’s customer info
      if (response?.data?.data?.length) {
        console.log('👤 Sample Customer:', response.data.data[0].customer);
        console.log('📍 Possible Location:', response.data.data[0].customer?.location || 'Not Found');
      }

      // ✅ Return usable data for slice
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
      const token = getState()?.login?.token;
      if (!token) throw new Error('No token found. Please log in again.');

      const url = `https://api.estreewalla.com/api/v1/vendors/orders/${orderId}/summary`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      console.log('✅ Order Summary:', response.data);
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

      // ✅ Ensure reason is always provided when rejected
      const finalReason =
        status === 'rejected'
          ? reason || 'Order rejected by vendor'
          : reason;

      const payload = finalReason ? { status, reason: finalReason } : { status };

      const url = `https://api.estreewalla.com/api/v1/vendors/orders/${orderId}/status`;

      const response = await axiosInstance.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('✅ Order Status Updated:', response.data);
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
        if (status === 'pending') state.pendingOrders = data;
        else if (status === 'accepted') state.acceptedOrders = data;
        else if (status === 'rejected') state.rejectedOrders = data;
        else if (status === 'completed') state.completedOrders = data;
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
        const updated = action.payload;
        // Optional: update local arrays
        state.pendingOrders = state.pendingOrders.filter(
          o => o.id !== updated.id,
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVendorOrderState } = vendorOrderSlice.actions;
export default vendorOrderSlice.reducer;
