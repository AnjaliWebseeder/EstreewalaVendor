import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice"
import loginReducer from "./slices/loginSlice"
import otpReducer from "./slices/otpSlice"
import otpVerifyReducer from "./slices/otpVerifySlice"
import forgotPasswordReducer from "./slices/forgotPasswordSlice"
import verifyOtpResetReducer from "./slices/verifyOtpSlice"
import resetPasswordReducer from "./slices/resetPasswordSlice"
import vendorOnboardingReducer from "./slices/vendorOnboardingSlice"
import subscriptionReducer from "./slices/subscriptionSlice"

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    otp:otpReducer,
    otpVerify: otpVerifyReducer,
    forgotPassword: forgotPasswordReducer,
    verifyOtpReset:verifyOtpResetReducer,
    resetPassword: resetPasswordReducer,
    vendorOnboarding: vendorOnboardingReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
