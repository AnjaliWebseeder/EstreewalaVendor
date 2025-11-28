import { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import CustomButton from '../../../components/button';
import OtpInput from '../../../otherComponent/otpInput';
import { styles } from './styles';
import { BackIcon } from '../../../assets/Icons/backIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from "../../../redux/slices/otpVerifySlice"
import { useToast } from '../../../utils/context/toastContext';
import { VendorContext } from '../../../utils/context/vendorContext';
import { getFcmToken } from '../../../utils/notification/notificationService';
import { updateFcmToken } from '../../../redux/slices/notificationSlice';

const OtpScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // track if user clicked verify
  const phone = route.params?.phone;
  const { loading, error } = useSelector((state) => state.otpVerify);
  const { showToast } = useToast(); 
  const { login, saveUserDetails } = useContext(VendorContext);

  // ✅ Clear errorMsg automatically when user types a valid OTP
  useEffect(() => {
    if (!isSubmitted) return; // don't validate until user clicks verify

    const otpValue = otp.join('');
    if (otpValue.length === 4 && /^\d+$/.test(otpValue)) {
      setError(''); // clear errorMsg as soon as OTP is valid
    }
  }, [otp, isSubmitted]);

  const saveFcmTokenAfterLogin = () => async (dispatch) => {
    try {
      const token = await getFcmToken();
      if (!token) return;

      await dispatch(updateFcmToken(token));
    } catch (error) {
      console.log("❌ Error saving FCM Token:", error);
    }
  };

  const handleVerify = async () => {
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
    
    const payload = {
      phone: phone,
      otp: "1234"
    };
    
    try {
      const result = await dispatch(verifyOtp(payload));

      if (verifyOtp.fulfilled.match(result)) {
        const { token, vendor } = result.payload;
        if (token && vendor) {
          await login(token, vendor);
          await dispatch(saveFcmTokenAfterLogin());
          navigation.replace('VendorRegistration');
        } else {
          console.warn("⚠️ Missing token or user in OTP verify response");
        }
      } else if (verifyOtp.rejected.match(result)) {
        showToast(result?.payload || 'Wrong OTP, please try again!', "error");
      }
    } catch (err) {
      console.error('Error dispatching OTP:', err);
      showToast(err || 'Wrong Otp, pls try again!', "error");
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
            {/* Display error message if exists */}
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : null}


          <View style={styles.main}>
            <Text style={styles.resend}>Resend OTP in 0:45</Text>
          </View>

          <CustomButton 
            loading={loading} 
            title="Verify" 
            onPress={handleVerify}   
            disabled={otp.join('').length !== 4 || !!errorMsg}  
          />

          <Text style={styles.textStyle}>
            By continuing, you agree to our <Text style={styles.link}> Terms of Service </Text> and acknowledge that you have read our <Text style={styles.link}>Privacy Policy.</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;