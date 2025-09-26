import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import BannerHeader from '../../../otherComponent/bannerHeader';
import CustomInput from '../../../components/Input';
import CustomButton from '../../../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // ✅ Validation regex
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

  // ✅ Live validation: enable button only when form is valid
  useEffect(() => {
    if (
      passwordRegex.test(password) &&
      confirmPassword === password
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }

    if (!isSubmitted) return;

    setErrors(prev => {
      const newErrors = { ...prev };
      if (password && passwordRegex.test(password)) newErrors.password = '';
      if (confirmPassword && confirmPassword === password) newErrors.confirmPassword = '';
      return newErrors;
    });
  }, [password, confirmPassword, isSubmitted]);

  const handleNext = () => {
    setIsSubmitted(true);
    const newErrors = {};

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password))
      newErrors.password =
        'Password must be at least 8 characters, include a capital letter, a number and a special character';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('StatusScreen', {
        title: 'Password Reset Successful !',
        message:
          'Your password has been updated securely. You can now log in with your new password.',
        buttonText: 'Go to login',
        onButtonPress: () => navigation.navigate('PasswordLogin'),
        onBackPress: () => navigation.goBack(),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Create New Password"
          subtitle="Enter your new password below here!"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.mainContainerStyle}>
          <CustomInput
            label="Password *"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
          <CustomInput
            label="Confirm Password *"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Text style={styles.footerText}>
            Password must be <Text style={styles.link}>at least 8 Characters</Text> and must contain at least a{' '}
            <Text style={styles.link}>Capital Letter</Text>, a Number and a <Text style={styles.link}>Special Character</Text>.
          </Text>
        </View>

        {/* ✅ Button disabled until form is valid */}
        <CustomButton title="Next" onPress={handleNext} disabled={!isFormValid} />
      </View>
    </SafeAreaView>
  );
}
