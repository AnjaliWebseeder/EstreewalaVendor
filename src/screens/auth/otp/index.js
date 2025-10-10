import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/button';
import OtpInput from '../../../otherComponent/otpInput';
import { styles } from './styles';
import { BackIcon } from '../../../assets/Icons/backIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, clearError,resetOtpVerifyState } from "../../../redux/slices/otpVerifySlice"
import { useToast } from '../../../utils/context/toastContext';

const OtpScreen = ({ navigation , route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // track if user clicked verify
  const phone = route.params?.phone;
  const { loading, success, error } = useSelector((state) => state.otpVerify);
  const { showToast } = useToast(); 

    // 🧹 Clear previous login status on mount
        useEffect(() => {
          dispatch(resetOtpVerifyState());
        }, [dispatch]);
      
    // Handle success
  useEffect(() => {
    if (success) {
      console.log('OTP verified successfully!');
      showToast('OTP sent successfully!', 'success');
      // Navigate to dashboard or next screen
      setTimeout(() => {
       navigation.replace('VendorRegistration');
      }, 1000);
    }
  }, [success, navigation]);

  // Handle error
  useEffect(() => {
    if (error) {
      setError(error);
      showToast(error, 'error');
      setTimeout(() => {
        dispatch(clearError());
        setError('');
      }, 5000);
    }
  }, [error, dispatch]);


  // ✅ Clear errorMsg automatically when user types a valid OTP
  useEffect(() => {
    if (!isSubmitted) return; // don't validate until user clicks verify

    const otpValue = otp.join('');
    if (otpValue.length === 4 && /^\d+$/.test(otpValue)) {
      setError(''); // clear errorMsg as soon as OTP is valid
    }
  }, [otp, isSubmitted]);

  const handleVerify = async() => {
    setIsSubmitted(true); // user clicked verify
    const otpValue = otp.join('');

    if (!otpValue) {
      setError('Please enter the OTP');
      return;
    }
    if (otpValue.length !== 4) {
      setError('OTP must be 4 digits');
      return;
    }
    if (!/^\d+$/.test(otpValue)) {
      setError('OTP must contain only numbers');
      return;
    }

    // ✅ Passed all validations
    setError('');
    // await login('user_token_here');
     const payload = {
      phone: phone,
      otp: "1234"
    };

    console.log("Verifying OTP:", payload);
    dispatch(verifyOtp(payload));
  
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../../assets/images/otp.png')} 
            style={styles.banner} 
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subText}>We have sent the code verification to your Mobile Number</Text>

        <OtpInput otp={otp} setOtp={setOtp} />

        {/* 👇 Error message */}
        {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

        <View style={styles.main}>
          <Text style={styles.resend}>Resend OTP in 0:45</Text>
        </View>

        <CustomButton loading={loading} title="Verify" onPress={handleVerify}   disabled={otp.join('').length !== 4 || !!errorMsg}  />

        <Text style={styles.textStyle}>
          By continuing, you agree to our <Text style={styles.link}> Terms of Service </Text> and acknowledge that you have read our <Text style={styles.link}>Privacy Policy.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
