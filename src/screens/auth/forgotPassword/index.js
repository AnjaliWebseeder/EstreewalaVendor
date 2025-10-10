import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import BannerHeader from '../../../otherComponent/bannerHeader';
import CustomInput from '../../../components/Input';
import CustomButton from '../../../components/button';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError,resetForgotPasswordState } from "../../../redux/slices/forgotPasswordSlice";
import { useToast } from '../../../utils/context/toastContext';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.forgotPassword);
  const { showToast } = useToast();

    // 🧹 Clear previous login status on mount
        useEffect(() => {
          dispatch(resetForgotPasswordState());
        }, [dispatch]);
      

   // Handle success
  useEffect(() => {
    if (success) {
      console.log('Reset email sent successfully!');
      showToast('Forgot Password email sent successfully!', 'success');
          
      // Navigate to reset password screen or show success message
      setTimeout(() => {
           navigation.navigate('VerifyEmail', { email: email });
      }, 1000);
    }
  }, [success, showToast, navigation]);

  // Handle error
  useEffect(() => {
    if (error) {
      showToast(error || "Forgot Password failed, please try again", 'error');
      setError(error);
      setTimeout(() => {
        dispatch(clearError());
        setError('');
      }, 5000);
    }
  }, [error, dispatch]);

  // ✅ Live validation
  useEffect(() => {
    if (!isSubmitted) return;

    if (email && /\S+@\S+\.\S+/.test(email)) {
      setError('');
    } else if (!email.trim()) {
      setError('Email is required');
    } else {
      setError('Enter a valid email');
    }
  }, [email, isSubmitted]);

   const handleNext = () => {
    setIsSubmitted(true);

    if (!email.trim()) {
      setError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    // ✅ Passed validation
    setError('');
    const payload = {
      email: email.trim()
    };

    console.log("Sending reset email to:", payload.email);
    dispatch(forgotPassword(payload));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Forgot Password"
          subtitle="Enter your email to receive reset instructions"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.mainContainerStyle}>
          <CustomInput
            iconName="mail"
            label="Email Address"
            placeholder="e.g. patel@123"
            value={email}
            onChangeText={setEmail}
            errorMsg={errorMsg}
          />

          <Text style={styles.footerText}>
            Enter your registered email address. We’ll send you an OTP for verification.
          </Text>
        </View>

        {/* ✅ Disabled until valid email */}
        <CustomButton loading={loading}  title="Next" onPress={handleNext} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text
            style={[
              styles.footerText,
              { textAlign: 'center', color: appColors.black },
            ]}
          >
            Don’t have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
