import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import ArrowRightIcon from '../../../assets/Icons/back-btn';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // track if Request OTP clicked

  // ✅ Clear error automatically when user types a valid phone number
  useEffect(() => {
    if (!isSubmitted) return;

    const phoneDigits = phone.replace(/\D/g, ''); // remove non-digits
    if (phoneDigits.length === 10) {
      setError(''); // clear error when valid
    }
  }, [phone, isSubmitted]);

  const handleRequestOtp = () => {
    setIsSubmitted(true);

    const phoneDigits = phone.replace(/\D/g, ''); // remove non-digits
    if (!phoneDigits) {
      setError('Please enter your phone number');
      return;
    }
    if (phoneDigits.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }

    // ✅ Passed validation
    setError('');
    navigation.navigate('Otp'); // go to OTP screen
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Banner Image */}
        <Image source={require('../../../assets/images/login.png')} style={styles.banner} />

        {/* Title */}
        <Text style={styles.title}>Welcome Back </Text>
        <Text style={styles.subText}>
          Enter your phone number we will send you a confirmation code there
        </Text> 

        <View style={styles.main}>
          {/* Phone Input */}
          <View style={styles.phoneContainer}>
            <Text style={styles.flag}>🇮🇳</Text>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="1234567890"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={appColors.lightText}
            />
          </View>

          {/* Error message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.text}>
            Securing your personal information is our priority.
          </Text>

          {/* Request OTP Button */}
          <TouchableOpacity style={[styles.button,{
            backgroundColor:phone.length === 10 ? appColors.secondary : appColors.inActive
          }]} onPress={handleRequestOtp}
           disabled={phone.length < 10}
          >
            <Text style={[styles.buttonText,{color : phone.length === 10? appColors.white : appColors.disableText}]}>Request OTP</Text>
            <ArrowRightIcon color={phone.length === 10 ? appColors.white : appColors.disableText} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View>  

          {/* Secondary Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('PasswordLogin')}
          >
            <Text style={styles.secondaryText}>Sign in with Password</Text>
            <ArrowRightIcon color={"gray"} />
          </TouchableOpacity> 

          {/* Footer */}
          <TouchableOpacity
            style={{alignItems:"center", bottom:6}}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.footerText}>
              Don’t have an account? <Text style={styles.link}>Register</Text>
            </Text>
          </TouchableOpacity> 
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
