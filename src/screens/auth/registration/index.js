import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/Input";
import BannerHeader from "../../../otherComponent/bannerHeader";
import { styles } from "./styles";
import { windowHeight } from "../../../theme/appConstant";
import { signupVendor, resetVendorState } from "../../../redux/slices/signupSlice";
import { useToast } from "../../../utils/context/toastContext";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.signup);
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Password validation regex (same as ResetPassword)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/;

  useEffect(() => {
    dispatch(resetVendorState());
  }, [dispatch]);

  const handleCreateAccount = async () => {
    setIsSubmitted(true);
    const newErrors = {};

    // ✅ Validate each field
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^[0-9]{10}$/.test(mobileNumber))
      newErrors.mobileNumber = 'Enter a valid 10-digit number';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Enter a valid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password))
      newErrors.password =
        'Password must be at least 8 characters, include a capital letter, a number and a special character';

    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    // ❌ Stop if any validation error
    if (Object.keys(newErrors).length > 0) return;

    // ✅ Payload
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      phone: mobileNumber.trim(),
      role: 'vendor',
    };

    try {
      const resultAction = await dispatch(signupVendor(payload));
      if (signupVendor.fulfilled.match(resultAction)) {
        setTimeout(() => {
          navigation.replace('PasswordLogin');
        }, 1500);
      } else if (signupVendor.rejected.match(resultAction)) {
        showToast(resultAction?.payload?.message || 'Signup Failed', "error");
      }
    } catch (err) {
      console.error('Signup error:', err);
      showToast(err || 'Signup Failed', "error");
    }
  };

  // ✅ Live validation for each field
  const handleInputChange = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        if (value.trim()) removeError(field);
        break;
      case "lastName":
        setLastName(value);
        if (value.trim()) removeError(field);
        break;
      case "mobileNumber":
        setMobileNumber(value);
        if (/^[0-9]{10}$/.test(value)) removeError(field);
        break;
      case "email":
        setEmail(value);
        if (/\S+@\S+\.\S+/.test(value)) removeError(field);
        break;
      case "password":
        setPassword(value);
        if (passwordRegex.test(value)) removeError(field);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        if (value === password) removeError(field);
        break;
    }
  };

  // helper to remove error dynamically
  const removeError = (field) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BannerHeader
          bannerImage={require("../../../assets/images/background.png")}
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
              onChangeText={(val) => handleInputChange("firstName", val)}
              error={errors.firstName}
            />
            <CustomInput
              label="Last Name *"
              placeholder="e.g. Rao"
              value={lastName}
              onChangeText={(val) => handleInputChange("lastName", val)}
              error={errors.lastName}
            />
            <CustomInput
              label="Mobile Number *"
              placeholder="e.g. 9876543210"
              keyboardType="number-pad"
              value={mobileNumber}
              onChangeText={(val) => handleInputChange("mobileNumber", val)}
              error={errors.mobileNumber}
              maxLength={10}
            />
            <CustomInput
              label="Email Address *"
              placeholder="e.g. nick123@gmail.com"
              value={email}
              onChangeText={(val) => handleInputChange("email", val)}
              error={errors.email}
            />
            <CustomInput
              label="Password *"
              placeholder="Enter password"
              value={password}
              onChangeText={(val) => handleInputChange("password", val)}
              secureTextEntry
              error={errors.password}
            />
            <CustomInput
              label="Confirm Password *"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={(val) => handleInputChange("confirmPassword", val)}
              secureTextEntry
              error={errors.confirmPassword}
            />

        
          </View>

          <CustomButton
            loading={loading}
            title="Create Account"
            onPress={handleCreateAccount}
          />

          <View style={styles.row}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("PasswordLogin")}>
              <Text style={styles.link}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
