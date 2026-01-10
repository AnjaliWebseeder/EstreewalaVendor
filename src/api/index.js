export const BASE_URL = 'https://www.api.estreewalla.com/api/v1';
export const REGISTER_SENDOTP = `${BASE_URL}/vendor-auth/register-send-otp`;
export const REGISTER_VERIFYOTP = `${BASE_URL}/vendor-auth/register-verify-otp`;
export const LOGIN = `${BASE_URL}/auth/login`;
export const SENDOTP = `${BASE_URL}/vendor-auth/send-otp`;
export const VERIFYOTP = `${BASE_URL}/vendor-auth/verify-otp-login`;
export const FORGOTPASSWORD = `${BASE_URL}/auth/forgot-password`;
export const VERIFYOTPRESET = `${BASE_URL}/vendor-auth/verify-otp-reset`;
export const RESETPASSWORD = `${BASE_URL}/vendor-auth/reset-password`;
export const COMPLETIONSTATUS = `${BASE_URL}/vendors/completion-status`;
export const MULTISTEPONBOARDINGSTEP1 = `${BASE_URL}/vendors/complete/step1`;
export const MULTISTEPONBOARDINGSTEP2 = `${BASE_URL}/vendors/complete/step2`;
export const MULTISTEPONBOARDINGSTEP3 = `${BASE_URL}/vendors/complete/step3`;
export const MULTISTEPONBOARDINGSTEP4 = `${BASE_URL}/vendors/complete/step4`;
export const MULTISTEPONBOARDINGSTEP5 = `${BASE_URL}/vendors/complete/step5`;
export const SUBSCRIPTION_PLANS = `${BASE_URL}/subscriptions/plans`;
export const CREATE_SUBSCRIPTION = `${BASE_URL}/subscriptions/create`;
export const VERIFY_SUBSCRIPTION = `${BASE_URL}/subscriptions/verify`;
export const MY_SUBSCRIPTIONS = `${BASE_URL}/subscriptions/my`;
export const GET_VENDORDETAILS = `${BASE_URL}/vendors/details`;
export const UPDATE_FCM_API = `${BASE_URL}/vendors/update-fcm-token`;
export const DELETE_ACCOUNT_API = `${BASE_URL}/vendor-auth/delete-account`;
export const GET_VENDOR_SERVICES = `${BASE_URL}/vendors/get-services`;

export const GETMULTISTEPONBOARDINGSTEP1 = `${BASE_URL}/vendors/onboarding/step1`;
export const GETMULTISTEPONBOARDINGSTEP2 = `${BASE_URL}/vendors/onboarding/step2`;
export const GETMULTISTEPONBOARDINGSTEP3 = `${BASE_URL}/vendors/onboarding/step3`;
export const GETMULTISTEPONBOARDINGSTEP4 = `${BASE_URL}/vendors/onboarding/step4`;
export const GETMULTISTEPONBOARDINGSTEP5 = `${BASE_URL}/vendors/onboarding/step5`;

// notification

export const GET_VENDER_NOTIFICATIONS =
    `${BASE_URL}/vendors/my-notifications`;

export const MARK_NOTIFICATION_READ = (id) =>
    `${BASE_URL}/vendors/notifications/${id}/read`;

// dashboard data 

export const DASHBOARD_DATA = `${BASE_URL}/vendors/dashboard-analytics`;
