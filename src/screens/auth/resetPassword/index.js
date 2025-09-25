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

  // ✅ Live validation: clear errors as user types
  useEffect(() => {
    if (!isSubmitted) return;

    setErrors(prev => {
      const newErrors = { ...prev };

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

      if (password && passwordRegex.test(password)) newErrors.password = '';
      if (confirmPassword && confirmPassword === password) newErrors.confirmPassword = '';

      return newErrors;
    });
  }, [password, confirmPassword, isSubmitted]);

  const handleNext = () => {
    setIsSubmitted(true);
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password))
      newErrors.password =
        'Password must be at least 8 characters, include a capital letter, a number and a special character';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // ✅ Passed validation
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
          bannerImage={require('../../../assets/images/register.png')}
          title="Create New Password 👋"
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

        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
