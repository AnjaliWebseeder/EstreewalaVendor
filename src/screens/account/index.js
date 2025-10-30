import React, { useContext, useState, useEffect } from "react";
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
import { launchImageLibrary } from "react-native-image-picker";
import appColors from "../../theme/appColors";
import Header from "../../components/header";
import { styles } from "./styles";
import { VendorIcon } from "../../assets/Icons/vendor";
import { ContactIcon } from "../../assets/Icons/contact";
import { PasswordIcon } from "../../assets/Icons/password";
import { AboutIcon } from "../../assets/Icons/aboutus";
import { PrivacyPolicyIcon } from "../../assets/Icons/privacypolicy";
import { FaqIcon } from "../../assets/Icons/faq";
import { RateUsIcon } from "../../assets/Icons/rateUs";
import { SubscriptionIcon } from "../../assets/Icons/subscriptionIcon";
import LinearGradient from "react-native-linear-gradient";
import { VendorContext } from "../../utils/context/vendorContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PremiumSubscriptionIcon from "../../assets/Icons/premiumSubscription";
import { useDispatch, useSelector } from "react-redux";
import { getMySubscriptions } from "../../redux/slices/subscriptionSlice";

// ==== MENU ITEM COMPONENT ====
const MenuItem = ({ icon, label, onPress, isLast, rightComponent }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={!!rightComponent}
  >
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.menuText}>{label}</Text>
    {rightComponent ? (
      rightComponent
    ) : (
      <Icon name="chevron-forward" size={18} color="#999" />
    )}
  </TouchableOpacity>
);

export default function Account({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const { logout } = useContext(VendorContext);
  const dispatch = useDispatch();
  const { mySubscriptions, loading } = useSelector((state) => state.subscription
  );

  const handleRateApp = () => {
    Linking.openURL("market://details?id=your.package.name");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Welcome");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // 🔹 Fetch user subscriptions on screen mount
  useEffect(() => {
    dispatch(getMySubscriptions());
  }, [dispatch]);

  // 🔹 Check if the user has at least one active subscription
  const hasActiveSubscription =
    mySubscriptions && mySubscriptions.length > 0 && 
    mySubscriptions.some((item) => item.status === "active");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.main}>
        <Header onBack={() => navigation.goBack()} title="My Account" />
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/images/service.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.userName}>Sparkling Suds</Text>
          <Text style={styles.userEmail}>johan.smith@example.com</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==== Upgrade To Premium Section ==== */}
      
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("SubscriptionPlans", {
                params: "accountScreen",
              })
            }
            style={{ marginHorizontal: 0, marginBottom: 16 }}
          >
            <LinearGradient
              colors={[appColors.orange, "#F1B37A", "#FFE6C7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.subscriptionPlan}
            >
              <PremiumSubscriptionIcon />
              <View style={styles.mainContainer}>
                <Text style={styles.textStyle}>Upgrade To Premium</Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    marginTop: 4,
                    opacity: 0.9,
                  }}
                >
                  Get faster pickups, priority delivery, and exclusive offers.
                </Text>
              </View>
              <Icon name="chevron-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
       

        {/* ==== First Group ==== */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<Icon name="person-outline" size={15} color={appColors.font} />}
            label="Personal Information"
            onPress={() => navigation.navigate("LoginSecurityScreen")}
          />

          {/* 🔹 Show “My Subscription Plans” only if user has one */}
          {hasActiveSubscription && (
            <MenuItem
              icon={<SubscriptionIcon />}
              label="My Subscription"
              onPress={() =>
                navigation.navigate("MySubscription")
              }
            />
          )}

          <MenuItem
            icon={<VendorIcon />}
            label="Vendor Details"
            onPress={() =>
              navigation.navigate("VendorRegistration", {
                fromScreen: "Account",
              })
            }
          />

          <MenuItem
            icon={<ContactIcon size={19} />}
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

        <View style={{ marginVertical: 5 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
            <LinearGradient
              colors={[appColors.blue, appColors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoutContainer}
            >
              <Icon
                name="log-out-outline"
                size={20}
                color={appColors.white}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.logOutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
