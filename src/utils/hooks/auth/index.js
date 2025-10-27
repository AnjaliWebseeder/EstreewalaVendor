// Helper function to get token from either login method
export const getToken = (getState) => {
  const state = getState();
   const token = state.login?.token || state.otpVerify?.token;
  return token;
};