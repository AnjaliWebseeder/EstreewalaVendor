import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/button';
import OtpInput from '../../../otherComponent/otpInput';
import { styles } from './styles';
import { BackIcon } from '../../../assets/Icons/backIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // track if user clicked verify

  // ✅ Clear error automatically when user types a valid OTP
  useEffect(() => {
    if (!isSubmitted) return; // don't validate until user clicks verify

    const otpValue = otp.join('');
    if (otpValue.length === 4 && /^\d+$/.test(otpValue)) {
      setError(''); // clear error as soon as OTP is valid
    }
  }, [otp, isSubmitted]);

  const handleVerify = () => {
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
    navigation.replace('VendorRegistration');
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
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.main}>
          <Text style={styles.resend}>Resend OTP in 0:45</Text>
        </View>

        <CustomButton title="Verify" onPress={handleVerify}   disabled={otp.join('').length !== 4 || !!error}  />

        <Text style={styles.textStyle}>
          By continuing, you agree to our <Text style={styles.link}> Terms of Service </Text> and acknowledge that you have read our <Text style={styles.link}>Privacy Policy.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
