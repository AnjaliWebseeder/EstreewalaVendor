// Navigation.js - COMPLETELY REPLACE your current file
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useEffect, useRef } from 'react';
import { VendorContext } from '../utils/context/vendorContext';

// Import all your screens...
import WelcomeScreen from '../screens/auth/welcome'
import OtpScreen from '../screens/auth/otp'
import PasswordLoginScreen from '../screens/auth/passwordLogin'
import RegisterScreen from '../screens/auth/registration'
import ForgotPassword from '../screens/auth/forgotPassword'
import VerifyEmail from '../screens/auth/verifyEmail'
import StatusScreen from '../otherComponent/statusScreen'
import ResetPassword from '../screens/auth/resetPassword'
import VendorRegistration from '../screens/vendorRegistration'
import AddOwner from '../screens/vendorRegistration/addOwner'
import AddBranch from '../screens/vendorRegistration/addBranch'
import SelectLocation from '../screens/vendorRegistration/selectLocation'
import PaymentSetup from '../screens/vendorRegistration/paymentSetup'
import SetPrice from '../screens/vendorRegistration/setPrice'
import Spalsh from '../screens/spalsh'
import BottomTab from "../navigation/bottomTab"
import ContactSupport from "../screens/otherSetting/contactSupport"
import AboutUs from "../screens/otherSetting/aboutUs"
import PrivacyPolicy from "../screens/otherSetting/privacyPolicy"
import FAQS from "../screens/otherSetting/faq"
import SubscriptionPlans from "../screens/subscriptionPlans"
import ConfirmPayment from "../otherComponent/order/confirmPayment"
import OrderSummary from "../otherComponent/order/orderSummary"
import PaymentSuccess from "../otherComponent/order/paymentSuccess"
import Notification from "../screens/otherSetting/notification"
import LoginSecurityScreen from '../screens/otherSetting/userProfile';

const Stack = createStackNavigator();

const Navigation = () => {
  const { userToken, isLoading, isFirstLaunch, hasCompletedVendorRegistration } = useContext(VendorContext);
  const navigationRef = useRef();

  // Show splash while context is loading
  if (isLoading) {
    return <Spalsh />;
  }

  // SIMPLIFIED Navigation Logic
  const getInitialRoute = () => {
    console.log('Navigation State:', {
      userToken: !!userToken,
      isFirstLaunch,
      hasCompletedVendorRegistration
    });

    if (!userToken) {
      return "Welcome"; // or "Splash" depending on your preference
    }

    // User is logged in
    if (isFirstLaunch) {
      // First time app launch
      if (!hasCompletedVendorRegistration) {
        return "VendorRegistration";
      } else {
        return "SubscriptionPlans";
      }
    } else {
      // Not first launch - go directly to main app
      return "Main";
    }
  };

  const initialRouteName = getInitialRoute();
  console.log('Initial Route:', initialRouteName);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        {/* ===== Auth Flow ===== */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="StatusScreen" component={StatusScreen} />
        <Stack.Screen name="Splash" component={Spalsh} />

        {/* ===== Onboarding Flow ===== */}
        <Stack.Screen name="VendorRegistration" component={VendorRegistration} />
        <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlans} />

        {/* ===== Vendor Registration Sub-screens ===== */}
        <Stack.Screen name="AddOwner" component={AddOwner} />
        <Stack.Screen name="AddBranch" component={AddBranch} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="PaymentSetup" component={PaymentSetup} />
        <Stack.Screen name="SetPrice" component={SetPrice} />

        {/* ===== Main App ===== */}
        <Stack.Screen name="Main" component={BottomTab} />

        {/* ===== Other Screens ===== */}
        <Stack.Screen name="ContactSupport" component={ContactSupport} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Faq" component={FAQS} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="LoginSecurityScreen" component={LoginSecurityScreen} />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;