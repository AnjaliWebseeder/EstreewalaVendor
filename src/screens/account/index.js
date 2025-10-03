import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import appColors from "../../theme/appColors";
import Header from "../../components/header";
import { styles } from "./styles";
import {VendorIcon} from "../../assets/Icons/vendor"
import { PaymentIcon } from "../../assets/Icons/payment";
import {ContactIcon} from "../../assets/Icons/contact"
import {PasswordIcon} from "../../assets/Icons/password"
import {AboutIcon} from "../../assets/Icons/aboutus"
import {PrivacyPolicyIcon} from "../../assets/Icons/privacypolicy"
import {FaqIcon} from "../../assets/Icons/faq"
import {RateUsIcon} from "../../assets/Icons/rateUs"
import {SubscriptionIcon} from "../../assets/Icons/subscriptionIcon"
import LinearGradient from 'react-native-linear-gradient';
import { VendorContext } from "../../utils/context/vendorContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ==== MENU ITEM COMPONENT ====
const MenuItem = ({ icon, label, onPress, isLast, rightComponent }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={!!rightComponent} // disable press if toggle present
  >
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.menuText}>{label}</Text>
    {rightComponent ? rightComponent : <Icon name="chevron-forward" size={18} color="#999" />}
  </TouchableOpacity>
);

export default function Account({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
    const {logout} = useContext(VendorContext)
  const handleRateApp = () => {
    Linking.openURL("market://details?id=your.package.name");
  };

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await logout()
    navigation.replace("Welcome")
  } catch (error) {
    console.log("Logout error:", error);
  }
};

  // Pick from gallery
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor={appColors.secondary} barStyle="dark-content" />
      <View style={styles.main}>
        <Header  onBack={() => navigation.goBack()}  title="My Account" />
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/images/avtar.jpg") // fallback
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.userName}>Johan Smith</Text>
          <Text style={styles.userEmail}>johan.smith@example.com</Text>
        </View>
      </View>
   <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
  
  {/* ==== Subscription Section ==== */}
  <View style={[styles.menuCard, { marginBottom: 10 }]}>
   
   <MenuItem
         icon={<Icon name="person-outline" size={15} color={appColors.font} />}
    label="Personal Information"
      onPress={() => navigation.navigate("LoginSecurityScreen")}
      
    />
    <MenuItem
         icon={<SubscriptionIcon/>}
    label="Subscription Plans"
      onPress={() => navigation.navigate("SubscriptionPlans", {params:"accountScreen"})}
      
    />
    
  </View>

  {/* ==== First Group ==== */}
  <View style={styles.menuCard}>
    <MenuItem
      icon={<VendorIcon />}
      label="Vendor Details"
      onPress={() => navigation.navigate("VendorRegistration", { fromScreen: "Account" })}
    />
    <MenuItem
      icon={<PaymentIcon size={29} color={appColors.font} />}
      label="Payment Setup"
      onPress={() => navigation.navigate("PaymentSetup", { showHeaderBar: true })}
    />
    <MenuItem
      icon={<ContactIcon size={19}/>}
      label="Contact Support"
      onPress={() => navigation.navigate("ContactSupport")}
      isLast
    />
  </View>

  {/* ==== Second Group ==== */}
  <View style={styles.menuCard}>
    <MenuItem
      icon={<PasswordIcon />}
      label="Reset Password"
      onPress={() => navigation.navigate("ResetPassword")}
    />
    <MenuItem
      icon={<AboutIcon />}
      label="About Us"
      onPress={() => navigation.navigate("AboutUs")}
    />
    <MenuItem
      icon={<PrivacyPolicyIcon />}
      label="Privacy Policy"
      onPress={() => navigation.navigate("PrivacyPolicy")}
    />
    <MenuItem
      icon={<FaqIcon />}
      label="FAQ"
      onPress={() => navigation.navigate("Faq")}
    />
    <MenuItem
      icon={<RateUsIcon />}
      label="Rate Us"
      onPress={handleRateApp}
      isLast
    />
  </View>
<View style={{marginVertical: 5 }}>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() =>handleLogout()}
  >
    <LinearGradient
      colors={[appColors.blue, appColors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.logoutContainer}
    >
      <Icon name="log-out-outline" size={20} color={appColors.white} style={{ marginRight: 10 }} />
      <Text style={styles.logOutText}>Logout</Text>
    </LinearGradient>
  </TouchableOpacity>
</View>

</ScrollView>

    </SafeAreaView>
  );
}
