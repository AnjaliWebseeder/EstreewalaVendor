import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/button";
import CustomInput from "../../../components/Input";
import BannerHeader from "../../../otherComponent/bannerHeader";
import { styles } from "./styles";
import { windowHeight } from "../../../theme/appConstant";
import { signupVendor } from "../../../redux/slices/signupSlice";
import { useToast } from "../../../utils/context/toastContext";
import { resetVendorState } from "../../../redux/slices/signupSlice";
const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.signup);
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

   // 🧹 Clear previous login status on mount
  useEffect(() => {
    dispatch(resetVendorState());
  }, [dispatch]);

  // Handle success toast
  useEffect(() => {
    if (success) {
      showToast('Account created successfully!', 'success');
      // Navigate after a delay to show the toast
      setTimeout(() => {
        navigation.replace("VendorRegistration");
      }, 1500);
    }
  }, [success, showToast, navigation]);

  // Handle error toast
  useEffect(() => {
    if (error) {
      showToast(error || "Signup failed, please try again", 'error');
    }
  }, [error, showToast]);

  const handleCreateAccount = () => {
    setIsSubmitted(true);
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        name: `${firstName?.trim()} ${lastName?.trim()}`,
        email: email?.trim(),
        password: password,
      };

      console.log("Payload sent to API:", JSON.stringify(payload));
      dispatch(signupVendor(payload));
    } 
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
            <CustomButton loading={loading} title="Create Account" onPress={handleCreateAccount} />
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
