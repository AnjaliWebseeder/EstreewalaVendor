import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import BannerHeader from '../../../otherComponent/bannerHeader';
import OtpInput from '../../../otherComponent/otpInput';
import CustomButton from '../../../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmail({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(30); // 30 seconds countdown

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Clear error automatically when OTP becomes valid
  useEffect(() => {
    if (!isSubmitted) return;

    const otpValue = otp.join('');
    if (otpValue.length === 4 && /^\d+$/.test(otpValue)) {
      setError('');
    }
  }, [otp, isSubmitted]);

  const handleVerify = async () => {
    setIsSubmitted(true);
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

    // ✅ Passed validation
    setError('');
    try {
      navigation.navigate('StatusScreen', {
        title: 'Email Verified!',
        message:
          'Your email has been successfully verified. You can now create a new password to secure your account.',
        buttonText: 'Continue',
        onButtonPress: () => navigation.navigate('ResetPassword'),
        onBackPress: () => navigation.goBack(),
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Invalid or expired OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    if (timer === 0) {
      try {
        console.log('Resend OTP called');
        setTimer(30);
        // Alert.alert('OTP Sent', 'We’ve sent a new verification code to your email.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong while resending the code.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/register.png')}
          title="Verify Your Email 👋"
          subtitle="We’ve sent a 4-digit code to your email. Please enter it below to verify your number."
          onBackPress={() => navigation.goBack()}
        />

        <OtpInput otp={otp} setOtp={setOtp} />

        {/* Error message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.blankView} />

        <CustomButton title="Next" onPress={handleVerify} />

        <TouchableOpacity
          style={styles.button}
          disabled={timer > 0}
          onPress={handleResend}
        >
          <Text style={styles.footerText}>
            Didn’t receive the code?{' '}
            {timer > 0 ? (
              <Text style={styles.link}>Resend in {timer}s</Text>
            ) : (
              <Text style={styles.link}>Resend</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
