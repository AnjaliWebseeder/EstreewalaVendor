import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomButton from '../../../components/button';
import CustomInput from '../../../components/Input';
import BannerHeader from '../../../otherComponent/bannerHeader';
import { styles } from './styles';
import { windowHeight } from '../../../theme/appConstant';
import { useToast } from '../../../utils/context/toastContext';

import {
  resetVendorState,
  sendRegisterOtp,
  verifyRegisterOtp,
} from '../../../redux/slices/signupSlice';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, otpSent } = useSelector(state => state.signup);
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

  const isValidIndianMobile = number => /^[6-9]\d{9}$/.test(number);

  useEffect(() => {
    dispatch(resetVendorState());
  }, [dispatch]);

  useEffect(() => {
    if (!otpSent || resendTimer === 0) return;
    const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    if (resendTimer === 1) setCanResend(true);
    return () => clearTimeout(timer);
  }, [otpSent, resendTimer]);

  const startResendTimer = () => {
    setResendTimer(30);
    setCanResend(false);
  };

  const handleCreateAccount = async () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!isValidIndianMobile(mobileNumber))
      newErrors.mobileNumber = 'Enter valid mobile number';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter valid email';
    if (!passwordRegex.test(password))
      newErrors.password =
        'Password must contain uppercase, number & special character';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const payload = { phone: mobileNumber, email, firstName, lastName, password };
    const result = await dispatch(sendRegisterOtp(payload));

    if (sendRegisterOtp.fulfilled.match(result)) {
      showToast(result.payload?.message || 'OTP sent', 'success');
      startResendTimer();
    } else {
      showToast(result.payload?.message || 'Failed to send OTP', 'error');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) return showToast('Enter valid OTP', 'error');
    const result = await dispatch(verifyRegisterOtp({ phone: mobileNumber, otp }));
    if (verifyRegisterOtp.fulfilled.match(result)) {
      showToast('Registration successful', 'success');
      navigation.replace('PasswordLogin');
    } else {
      showToast(result.payload?.message || 'Invalid OTP', 'error');
    }
  };

  const handleResendOtp = async () => {
    const result = await dispatch(
      sendRegisterOtp({ phone: mobileNumber, email, firstName, lastName, password })
    );
    if (sendRegisterOtp.fulfilled.match(result)) {
      showToast('OTP resent successfully', 'success');
      startResendTimer();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Create Account"
          subtitle="Join us to get started"
          bannerStyle={{ height: windowHeight(220) }}
          onBackPress={() => navigation.goBack()}
        /> */}
      {/* KeyboardAwareScrollView wraps everything except Banner */}
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 80 : 20}
      >
        <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Create Account"
          subtitle="Join us to get started"
          bannerStyle={{ height: windowHeight(220) }}
          onBackPress={() => navigation.goBack()}
        />

        <View style={{ padding: 20, flexGrow: 1 }}>
          <CustomInput
            label="First Name *"
            placeholder="e.g. Nick"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
          />
          <CustomInput
            label="Last Name *"
            placeholder="e.g. Rao"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
          />
          <CustomInput
            label="Mobile Number *"
            placeholder="e.g. 9876543210"
            value={mobileNumber}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={setMobileNumber}
            error={errors.mobileNumber}
          />
          <CustomInput
            label="Email *"
            placeholder="e.g. nick@gmail.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <CustomInput
            label="Password *"
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <CustomInput
            label="Confirm Password *"
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
          />

          {otpSent && (
            <>
              <CustomInput
                label="Enter OTP *"
                placeholder="1234"
                keyboardType="number-pad"
                value={otp}
                maxLength={4}
                onChangeText={setOtp}
              />
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={{ color: '#007AFF', fontWeight: '600' }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ color: '#999' }}>Resend OTP in {resendTimer}s</Text>
                )}
              </View>
            </>
          )}

          {!otpSent ? (
            <CustomButton loading={loading} title="Send OTP" onPress={handleCreateAccount} />
          ) : (
            <CustomButton loading={loading} title="Verify OTP" onPress={handleVerifyOtp} />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
              <Text style={{ color: '#007AFF', fontWeight: '600' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
