import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';
import loginReducer from './slices/loginSlice';
import otpReducer from './slices/otpSlice';
import otpVerifyReducer from './slices/otpVerifySlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import verifyOtpResetReducer from './slices/verifyOtpSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import vendorOnboardingReducer from './slices/vendorOnboardingSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import vendorOrderReducer from './slices/vendorOrderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import vendorReducer from "./slices/vendorSlice"
import notificationReducer from "./slices/notificationSlice"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login', 'otp', 'otpVerify'], 
};

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  otp: otpReducer,
  otpVerify: otpVerifyReducer,
  forgotPassword: forgotPasswordReducer,
  verifyOtpReset: verifyOtpResetReducer,
  resetPassword: resetPasswordReducer,
  vendorOnboarding: vendorOnboardingReducer,
  subscription: subscriptionReducer,
  vendorOrders: vendorOrderReducer,
  vendor:vendorReducer,
  notification:notificationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

