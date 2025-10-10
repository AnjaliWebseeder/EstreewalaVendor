import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../../../components/button';
import CustomInput from '../../../components/Input';
import BannerHeader from '../../../otherComponent/bannerHeader';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from '../../../utils/context/toastContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginVendor,resetVendorState } from '../../../redux/slices/loginSlice';

const PasswordLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // error state
  const { showToast } = useToast();
    const { loading, success, error } = useSelector((state) => state.login);

       // 🧹 Clear previous login status on mount
      useEffect(() => {
        dispatch(resetVendorState());
      }, [dispatch]);
    

    // Handle success toast
    useEffect(() => {
      if (success) {
        showToast('Sign In successfully!', 'success');
        // Navigate after a delay to show the toast
        setTimeout(() => {
         navigation.replace('VendorRegistration');
        }, 1500);
      }
    }, [success, showToast, navigation]);
  
    // Handle error toast
    useEffect(() => {
      if (error) {
        showToast(error || "Signup failed, please try again", 'error');
      }
    }, [error, showToast]);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
       const payload = {
        email: email?.trim(),
        password: password,
      };
      dispatch(loginVendor(payload));
    }
  };

  // Live validation for email
  const handleEmailChange = text => {
    setEmail(text);

    if (!text) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/\S+@\S+\.\S+/.test(text)) {
      setErrors(prev => ({ ...prev, email: 'Enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // Live validation for password
  const handlePasswordChange = text => {
    setPassword(text);

    if (!text) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else if (text.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require('../../../assets/images/background.png')}
          title="Welcome Back"
          subtitle="Sign in to your account"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.mainContainerStyle}>
          <CustomInput
            iconName="mail"
            label="Email Address"
            placeholder="e.g. patel@123"
            value={email}
            onChangeText={handleEmailChange}
            error={errors.email}
          />

          <CustomInput
            iconName="lock"
            label="Enter your password"
            placeholder="******"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgot}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Disabled if wrong details */}
        <CustomButton
          loading={loading} 
          title="Sign In"
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
};

export default PasswordLoginScreen;
