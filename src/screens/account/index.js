import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
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
  const handleRateApp = () => {
    Linking.openURL("market://details?id=your.package.name");
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==== USER INFO ==== */}
      

        {/* ==== First Group ==== */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<VendorIcon/>}
            label="Vendor Details"
            onPress={() => navigation.navigate("")}
          />
          <MenuItem
            icon={<PaymentIcon size={18} color={appColors.font} />}
            label="Payment Setup"
            onPress={() => navigation.navigate("PaymentSetup",{showHeaderBar:true})}
          />
          <MenuItem
            icon={<ContactIcon/>}
            label="Contact Support"
            onPress={() => navigation.navigate("ContactSupport")}
            isLast
          />
        </View>

        {/* ==== Second Group ==== */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<PasswordIcon/>}
            label="Reset Password"
            onPress={() => navigation.navigate("ResetPassword")}
          />
          <MenuItem
            icon={<AboutIcon/>}
            label="About Us"
            onPress={() => navigation.navigate("AboutUs")}
          />
          <MenuItem
            icon={<PrivacyPolicyIcon/>}
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <MenuItem
            icon={<FaqIcon/>}
            label="FAQ"
            onPress={() => navigation.navigate("Faq")}
          />
          <MenuItem
            icon={<RateUsIcon/>}
            label="Rate Us"
            onPress={handleRateApp}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
