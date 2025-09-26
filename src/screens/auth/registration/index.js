import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import CustomButton from '../../../components/button';
import CustomInput from '../../../components/Input';
import { styles } from './styles';
import BannerHeader from '../../../otherComponent/bannerHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { windowHeight } from '../../../theme/appConstant';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vendorImage, setVendorImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Live validation: clear errors as user types
  useEffect(() => {
    if (!isSubmitted) return;

    setErrors(prev => {
      const newErrors = { ...prev };

      if (firstName.trim()) newErrors.firstName = '';
      if (lastName.trim()) newErrors.lastName = '';
      if (email.trim() && /\S+@\S+\.\S+/.test(email)) newErrors.email = '';
      if (password && password.length >= 6) newErrors.password = '';
      if (confirmPassword && confirmPassword === password) newErrors.confirmPassword = '';

      return newErrors;
    });
  }, [firstName, lastName, email, password, confirmPassword, isSubmitted]);

  const handleCreateAccount = () => {
    setIsSubmitted(true);
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // ✅ All validations passed
      navigation.replace('VendorRegistration');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Create Account"
          subtitle="Join us to get started"
          bannerStyle={{ height: windowHeight(220) }}
          onBackPress={() => navigation.goBack()}
        />
<ScrollView contentContainerStyle={styles.contentContainerStyle}>
 <View style={styles.mainStyle}>
          <CustomInput
            label="First Name *"
            placeholder="e.g. Nick"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
          />
          <CustomInput
            label="Last Name *"
            placeholder="e.g. Rao"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
          />
          <CustomInput
            label="Email Address *"
            placeholder="e.g. nick123@gmail.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
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
        </View>
          <CustomButton title="Create Account" onPress={handleCreateAccount} />

        <View style={styles.row}>
          <Text style={styles.footerText}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
            <Text style={styles.link}> Login</Text>
          </TouchableOpacity>
        </View>
</ScrollView>
       

      
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
