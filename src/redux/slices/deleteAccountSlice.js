import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig"
import {DELETE_ACCOUNT_API} from "../../api/index"

// Delete Account
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🗑️ Deleting account...");
      
      const response = await axiosInstance.delete(DELETE_ACCOUNT_API, {
        timeout: 15000,
      });

      console.log("✅ Account deleted successfully:", response.data);
      
      return response.data;
      
    } catch (error) {
      console.log("❌ Delete Account Error:", error);
      
      let errorMessage = "Failed to delete account";
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState: {
    deleteLoading: false,
    deleteError: null,
    deleteSuccess: false,
  },
  reducers: {
    clearDeleteAccountState: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    resetDeleteAccount: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.deleteError = null;
        console.log("ACCOUNT DELETED SUCCESSFULLY");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
        state.deleteSuccess = false;
        console.log("ACCOUNT DELETE FAILED => ", action.payload);
      });
  },
});

export const { 
  clearDeleteAccountState,
  resetDeleteAccount,
} = deleteAccountSlice.actions;

export default deleteAccountSlice.reducer;