import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice"
import loginReducer from "./slices/loginSlice"
import otpReducer from "./slices/otpSlice"
import otpVerifyReducer from "./slices/otpVerifySlice"
import forgotPasswordReducer from "./slices/forgotPasswordSlice"

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    otp:otpReducer,
    otpVerify: otpVerifyReducer,
    forgotPassword: forgotPasswordReducer
  },
});

export default store;
