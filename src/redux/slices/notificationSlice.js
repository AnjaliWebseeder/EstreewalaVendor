import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { UPDATE_FCM_API, GET_VENDER_NOTIFICATIONS, MARK_NOTIFICATION_READ } from '../../api/index';

/* ===================== THUNKS ===================== */

// ✅ Update FCM Token (keep as is)
export const updateFcmToken = createAsyncThunk(
  'vendorNotification/updateFcmToken',
  async (fcmToken, { getState, rejectWithValue }) => {
    try {
      console.log('📨 Updating FCM Token:', fcmToken);
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axiosInstance.post(
        UPDATE_FCM_API,
        { fcmToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ FCM Token updated successfully:', response.data);
      return response.data;

    } catch (error) {
      console.log('❌ Update FCM Token Error:', error);

      let errorMessage = 'Failed to update FCM token';

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

// ✅ Fetch Vendor Notifications
export const fetchNotifications = createAsyncThunk(
  'vendorNotification/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axiosInstance.get(GET_VENDER_NOTIFICATIONS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("notification response.data", response.data);

      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch notifications'
      );
    }
  }
);

// ✅ Mark Notification as Read
export const markNotificationRead = createAsyncThunk(
  'vendorNotification/markNotificationRead',
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.login?.token ||
        state?.otpVerify?.token ||
        state?.vendor?.token ||
        null;

      if (!token) throw new Error('No token found. Please log in again.');

      await axiosInstance.patch(MARK_NOTIFICATION_READ(notificationId), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to mark notification read'
      );
    }
  }
);

/* ===================== SLICE ===================== */
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  success: false,
  error: null,
  fcmUpdating: false,
  fcmError: null,
};

const vendorNotificationSlice = createSlice({
  name: 'vendorNotification',
  initialState,
  reducers: {
    resetNotificationState: state => {
      state.notifications = [];
      state.unreadCount = 0;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.fcmUpdating = false;
      state.fcmError = null;
    },
    clearError: state => {
      state.error = null;
      state.fcmError = null;
    },
  },
  extraReducers: builder => {
    /* ================= FETCH NOTIFICATIONS ================= */
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload || [];
        state.unreadCount = action.payload?.filter(n => !n.read)?.length || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ================= MARK NOTIFICATION READ ================= */
    builder
      .addCase(markNotificationRead.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const index = state.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
          state.notifications[index].read = true;
        }
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ================= UPDATE FCM TOKEN ================= */
    builder
      .addCase(updateFcmToken.pending, state => {
        state.fcmUpdating = true;
        state.fcmError = null;
      })
      .addCase(updateFcmToken.fulfilled, state => {
        state.fcmUpdating = false;
      })
      .addCase(updateFcmToken.rejected, (state, action) => {
        state.fcmUpdating = false;
        state.fcmError = action.payload;
      });
  },
});

export const { resetNotificationState, clearError } = vendorNotificationSlice.actions;
export default vendorNotificationSlice.reducer;
