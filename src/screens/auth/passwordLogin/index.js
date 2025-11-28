import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StatusBar, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import CustomButton from '../../../components/button';
import CustomInput from '../../../components/Input';
import BannerHeader from '../../../otherComponent/bannerHeader';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from '../../../utils/context/toastContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginVendor, resetVendorState } from '../../../redux/slices/loginSlice';
import { VendorContext } from '../../../utils/context/vendorContext';
import { getFcmToken } from '../../../utils/notification/notificationService';
import { updateFcmToken } from '../../../redux/slices/notificationSlice';

const PasswordLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const { loading } = useSelector((state) => state.login);
  const { login, saveUserDetails } = useContext(VendorContext);
  
  // ✅ Password validation regex (same as ResetPassword screen)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

  // 🧹 Clear previous login state when screen mounts
  useEffect(() => {
    dispatch(resetVendorState());
  }, [dispatch]);

  const saveFcmTokenAfterLogin = () => async (dispatch) => {
    try {
      const token = await getFcmToken();
      if (!token) return;
  
      await dispatch(updateFcmToken(token));
    } catch (error) {
      console.log("❌ Error saving FCM Token:", error);
    }
  };

  const handleLogin = async () => {
    const newErrors = {};

    // ✅ Email validation
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Enter a valid email address';

    // ✅ Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters, include a capital letter, a number and a special character';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = { email: email.trim(), password };

    try {
      const resultAction = await dispatch(loginVendor(payload));
      if (loginVendor.fulfilled.match(resultAction)) {
          const {token,user} = resultAction.payload
    
        await login(token, user);
        await dispatch(saveFcmTokenAfterLogin());
          
        setTimeout(() => {
          navigation.replace('VendorRegistration');
        }, 1500);
      } else if (loginVendor.rejected.match(resultAction)) {
        showToast(resultAction?.payload?.message || 'Sign In Failed', 'error');
      }
    } catch (err) {
      console.error('Sign In Failed:', err);
      showToast(err || 'Sign In Failed', 'error');
    }
  };

  // ✅ Live validation for email
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    } else if (!/\S+@\S+\.\S+/.test(text)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // ✅ Live validation for password
  const handlePasswordChange = (text) => {
    setPassword(text);

    if (!text) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    } else if (!passwordRegex.test(text)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters, include a capital letter, a number and a special character',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <BannerHeader
            bannerImage={require('../../../assets/images/background.png')}
            title="Welcome Back"
            subtitle="Sign in to your account"
            onBackPress={() => navigation.goBack()}
          />

          <View style={styles.mainContainerStyle}>
            <CustomInput
              iconName="mail"
              label="Email Address"
              placeholder="e.g. patel@123"
              value={email}
              onChangeText={handleEmailChange}
              error={errors.email}
            />

            <CustomInput
              iconName="lock"
              label="Enter your password"
              placeholder="******"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              error={errors.password}
            />

            <Text style={styles.footerTextStyle}>
              Password must be{' '}
              <Text style={styles.linkStyle}>at least 8 Characters</Text> and must
              contain at least a <Text style={styles.linkStyle}>Capital Letter</Text>, a{' '}
              <Text style={styles.linkStyle}>Number</Text> and a{' '}
              <Text style={styles.linkStyle}>Special Character</Text>.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgot}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Disabled only if email/password invalid */}
          <CustomButton loading={loading} title="Sign In" onPress={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PasswordLoginScreen;