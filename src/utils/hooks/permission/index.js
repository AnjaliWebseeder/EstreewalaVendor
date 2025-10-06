import { Platform, PermissionsAndroid, Alert } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import messaging from "@react-native-firebase/messaging";
import { useContext } from "react";
import { VendorContext } from "../../context/vendorContext";

export const usePermissions = () => {
  const { saveLocation } = useContext(VendorContext);

  // ------------------ LOCATION PERMISSION ------------------
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "We need access to your location to show nearby orders.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn("Permission error:", err);
      }
    } else {
      getCurrentLocation(); // iOS handles its own dialog
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Location error:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: {
            "User-Agent": "LaundryApp/1.0",
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON response:", text);
        await saveLocation({
          latitude: lat,
          longitude: lng,
          address: "Location found",
        });
        return;
      }

      await saveLocation({
        latitude: lat,
        longitude: lng,
        address: data.display_name || "Location found",
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
  };

  // ------------------ NOTIFICATION PERMISSION ------------------
  const requestNotificationPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Notification permission granted");
        getFcmToken();
      } else {
        Alert.alert(
          "Permission Required",
          "Please enable notifications to receive order updates."
        );
      }
    } catch (err) {
      console.warn("Notification permission error:", err);
    }
  };

  // Fetch FCM Token
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      // You can save this token to your backend if needed
    } catch (err) {
      console.error("Error getting FCM token:", err);
    }
  };

  // ------------------ EXPORT ------------------
  return {
    requestLocationPermission,
    requestNotificationPermission,
  };
};
