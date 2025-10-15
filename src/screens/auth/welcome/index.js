import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import ArrowRightIcon from '../../../assets/Icons/back-btn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendOtp, clearError } from '../../../redux/slices/otpSlice';
import { useToast } from '../../../utils/context/toastContext'; 

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading , error} = useSelector((state) => state.otp);
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
   const { showToast } = useToast(); 
  // Clear error automatically when user types a valid phone number
  useEffect(() => {
    if (!isSubmitted) return;

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 10) {
      setLocalError('');
    }
  }, [phone, isSubmitted]);


  const handleRequestOtp = async () => {
    setIsSubmitted(true);

    const phoneDigits = phone.replace(/\D/g, '');
    
    // Local validation
    if (!phoneDigits) {
      setLocalError('Please enter your phone number');
      return;
    }
    if (phoneDigits.length !== 10) {
      setLocalError('Phone number must be 10 digits');
      return;
    }

    // Passed validation - clear local error
    setLocalError('');

    // Prepare payload for API
    const payload = {
      phone: phoneDigits
    };

     try {
    const result = await dispatch(sendOtp(payload));
    if (sendOtp.fulfilled.match(result)) {
       showToast('OTP sent to mobile for login!', 'success');
     setPhone(phoneDigits);
      setTimeout(() => {
        navigation.navigate('Otp', { phone: phoneDigits });
      }, 1000);
    } else if (sendOtp.rejected.match(result)) {
       showToast(result?.payload || 'Failed to Send OTP', "error");
    }
  } catch (err) {
    console.error('Error dispatching OTP:', err);
       showToast(err || 'Failed to Send OTP', "error");
  }
    
   
  };

  // Format phone number as user types
  const handlePhoneChange = (text) => {
    // Remove non-digit characters
    const digits = text.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (digits.length <= 10) {
      setPhone(digits);
    }
    
    // Clear errors when user starts typing
    if (localError && digits.length > 0) {
      setLocalError('');
    }
    
    // Clear Redux error when user types
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <Image source={require('../../../assets/images/login.png')} style={styles.banner} />

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subText}>
          Enter your phone number we will send you a confirmation code there
        </Text>

        <View style={styles.main}>
          <View style={styles.phoneContainer}>
            <Text style={styles.flag}>🇮🇳</Text>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="1234567890"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              placeholderTextColor={appColors.lightText}
              maxLength={10}
              editable={!loading}
            />
          </View>

          <Text style={styles.text}>
            Securing your personal information is our priority.
          </Text>

          <TouchableOpacity 
            style={[
              styles.button,
              {
                backgroundColor: phone.length === 10 && !loading 
                  ? appColors.secondary 
                  : appColors.inActive
              }
            ]} 
            onPress={handleRequestOtp}
            disabled={phone.length < 10 || loading}
          >
            <Text style={[
              styles.buttonText,
              { 
                color: phone.length === 10 && !loading 
                  ? appColors.white 
                  : appColors.disableText 
              }
            ]}>
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </Text>
            {!loading && (
              <ArrowRightIcon color={
                phone.length === 10 && !loading 
                  ? appColors.white 
                  : appColors.disableText
              } />
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('PasswordLogin')}
            disabled={loading}
          >
            <Text style={styles.secondaryText}>Sign in with Password</Text>
            <ArrowRightIcon color={"gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", bottom: 6 }}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.link}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;