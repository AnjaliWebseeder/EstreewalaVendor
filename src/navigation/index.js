import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useEffect, useState } from 'react';
import { VendorContext } from '../utils/context/vendorContext';
import WelcomeScreen from '../screens/auth/welcome';
import OtpScreen from '../screens/auth/verifyphoneOtp';
import PasswordLoginScreen from '../screens/auth/passwordLogin';
import RegisterScreen from '../screens/auth/registration';
import ForgotPassword from '../screens/auth/forgotPassword';
import VerifyEmail from '../screens/auth/verifyEmail';
import ResetPassword from '../screens/auth/resetPassword';
import VendorRegistration from '../screens/vendorRegistration';
import AddOwner from '../screens/vendorRegistration/addOwner';
import AddBranch from '../screens/vendorRegistration/addBranch';
import SelectLocation from '../screens/vendorRegistration/selectLocation';
import PaymentSetup from '../screens/vendorRegistration/paymentSetup';
import SetPrice from '../screens/vendorRegistration/setPrice';
import SubscriptionPlans from '../screens/subscriptionPlans';
import BottomTab from "../navigation/bottomTab";
import ContactSupport from "../screens/otherSetting/contactSupport";
import AboutUs from "../screens/otherSetting/aboutUs";
import PrivacyPolicy from "../screens/otherSetting/privacyPolicy";
import FAQS from "../screens/otherSetting/faq";
import Notification from "../screens/otherSetting/notification";
import LoginSecurityScreen from '../screens/otherSetting/userProfile';
import ConfirmPayment from "../otherComponent/order/confirmPayment";
import OrderSummary from "../otherComponent/order/orderSummary";
import PaymentSuccess from "../otherComponent/order/paymentSuccess";
import MySubscriptionsScreen from "../screens/otherSetting/mySubscription";
import Splash from '../screens/spalsh';
import TermsOfServiceScreen from "../screens/otherSetting/termsOfService"

const Stack = createStackNavigator();

const Navigation = () => {
  const {
    userToken,
    isLoading,
    isFirstLaunch,
    hasCompletedVendorRegistration,
    hasCompletedSubscription,
  } = useContext(VendorContext);

  const [initialRoute, setInitialRoute] = useState('Splash');
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
  console.log('🔍 NAVIGATION DEBUG - Detailed State:', {
    isLoading,
    userToken: userToken ? `Token EXISTS (${userToken.substring(0, 10)}...)` : 'No Token',
    hasCompletedVendorRegistration,
    hasCompletedSubscription,
    isFirstLaunch
  });

  if (!isLoading) {
    let route = 'Welcome';

    if (!userToken) {
      route = 'Welcome';
      console.log('🚦 ROUTE: No token → Welcome');
    }
    else if (hasCompletedVendorRegistration === false) {
      route = 'VendorRegistration';
      console.log('🚦 ROUTE: Token + Registration FALSE → VendorRegistration');
    }
    else if (!hasCompletedSubscription) {
      route = 'SubscriptionPlans';
      console.log('🚦 ROUTE: Registered + No subscription → SubscriptionPlans');
    }
    else {
      route = 'Main';
      console.log('🚦 ROUTE: All complete → Main');
    }

    console.log('🎯 FINAL ROUTE DECISION:', route);
    setInitialRoute(route);
    
    const timer = setTimeout(() => {
      setNavigationReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }
}, [isLoading, userToken, hasCompletedVendorRegistration, hasCompletedSubscription]);

  // Show splash screen while loading or navigation not ready
  if (isLoading || !navigationReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false // Prevent back gestures on initial screens
        }} 
        initialRouteName={initialRoute}
      >
        {/* ===== Splash Screen ===== */}
        
        <Stack.Screen name="Splash" component={Splash} />

        {/* ===== Auth Flow ===== */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        {/* ===== Vendor Onboarding ===== */}
        <Stack.Screen 
          name="VendorRegistration" 
          component={VendorRegistration}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="AddOwner" component={AddOwner} />
        <Stack.Screen name="AddBranch" component={AddBranch} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="PaymentSetup" component={PaymentSetup} />
        <Stack.Screen name="SetPrice" component={SetPrice} />

        {/* ===== Subscription Flow ===== */}
        <Stack.Screen 
          name="SubscriptionPlans" 
          component={SubscriptionPlans}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="MySubscription" component={MySubscriptionsScreen} />

        {/* ===== Main App ===== */}
        <Stack.Screen 
          name="Main" 
          component={BottomTab}
          options={{ gestureEnabled: false }}
        />

        {/* ===== Settings & Info ===== */}
        <Stack.Screen name="ContactSupport" component={ContactSupport} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Faq" component={FAQS} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="LoginSecurityScreen" component={LoginSecurityScreen} />
        <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;