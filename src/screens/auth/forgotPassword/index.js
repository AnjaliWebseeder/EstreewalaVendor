import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import BannerHeader from '../../../otherComponent/bannerHeader';
import CustomInput from '../../../components/Input';
import CustomButton from '../../../components/button';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword({ navigation }) {
  const [vendorImage, setVendorImage] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Clear error automatically when user types a valid email
  useEffect(() => {
    if (!isSubmitted) return;

    if (email && /\S+@\S+\.\S+/.test(email)) {
      setError('');
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
    navigation.navigate('VerifyEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/register.png')}
          title="Forgot Password 👋"
          subtitle="Enter your email to receive reset instructions"
          defaultAvatar={require('../../../assets/images/avtar.jpg')}
          onImagePick={uri => setVendorImage(uri)}
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.mainContainerStyle}>
          <CustomInput
            iconName="mail"
            label="Email Address"
            placeholder="e.g. patel@123"
            value={email}
            onChangeText={setEmail}
            error={error}
          />

          <Text style={styles.footerText}>
            Enter your registered email address. We’ll send you an OTP for verification.
          </Text>
        </View>

        <CustomButton title="Next" onPress={handleNext} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.footerText, { textAlign: "center", color: appColors.black }]}>
            Don’t have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
