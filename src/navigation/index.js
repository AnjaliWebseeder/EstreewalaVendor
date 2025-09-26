import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import VerifyDetails from '../screens/vendorRegistration/verifyDetails'
import PaymentSetup from '../screens/vendorRegistration/paymentSetup'
import SetPrice from '../screens/vendorRegistration/setPrice'
import CreateCoupon from '../screens/vendorRegistration/createCoupon'
import Spalsh from '../screens/spalsh'

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='VendorRegistration'  screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Spalsh" component={Spalsh} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
       <Stack.Screen name="VerifyEmail" component={VerifyEmail} />  
      <Stack.Screen name="StatusScreen" component={StatusScreen} />  
       <Stack.Screen name="ResetPassword" component={ResetPassword} />  
      <Stack.Screen name="VendorRegistration" component={VendorRegistration} />  
        <Stack.Screen name="AddOwner" component={AddOwner} />  
<Stack.Screen name="AddBranch" component={AddBranch} />
<Stack.Screen name="SelectLocation" component={SelectLocation} />
<Stack.Screen name="VerifyDetails" component={VerifyDetails} />
<Stack.Screen name="PaymentSetup" component={PaymentSetup} />
<Stack.Screen name="SetPrice" component={SetPrice} />
<Stack.Screen name="CreateCoupon" component={CreateCoupon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
