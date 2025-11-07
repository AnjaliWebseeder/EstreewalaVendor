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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login', 'otp', 'otpVerify'], // ✅ only persist auth slice
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     signup: signupReducer,
//     login: loginReducer,
//     otp:otpReducer,
//     otpVerify: otpVerifyReducer,
//     forgotPassword: forgotPasswordReducer,
//     verifyOtpReset:verifyOtpResetReducer,
//     resetPassword: resetPasswordReducer,
//     vendorOnboarding: vendorOnboardingReducer,
//     subscription: subscriptionReducer,
//     vendorOrders: vendorOrderReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
});

// export default store;

export const persistor = persistStore(store);

