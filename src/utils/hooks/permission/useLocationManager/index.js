import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { usePermissions } from ".."

export const useLocationManager = () => {
  const { requestLocationPermission } = usePermissions();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // Get Current Location
  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        console.error("Location error:", error);
        if (error.code === 1) { // PERMISSION_DENIED
          setShowPermissionModal(true);
        } else {
          Alert.alert("Location Error", "Unable to fetch your location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  // Helper function to clean duplicate city names from address
  const cleanAddressString = useCallback((fullAddress, cityName) => {
    if (!fullAddress || !cityName) return fullAddress;
    
    // Create a clean address by removing duplicate city mentions
    const addressParts = fullAddress.split(', ');
    const cleanedParts = [];
    let cityFound = false;
    
    for (let i = 0; i < addressParts.length; i++) {
      const part = addressParts[i].trim();
      
      // Skip if this part contains the city name and we've already found the city
      if (part.includes(cityName)) {
        if (!cityFound) {
          cleanedParts.push(part);
          cityFound = true;
        }
        // Skip duplicate city entries
        continue;
      }
      
      // Skip generic terms that often cause duplication
      if (part.includes('Rural Taluka') || part.includes('Taluka') || part.includes('District')) {
        continue;
      }
      
      cleanedParts.push(part);
    }
    
    return cleanedParts.join(', ');
  }, []);

  // Reverse Geocoding to get address details WITH CLEANING
  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
        {
          headers: {
            "User-Agent": "LaundryApp/1.0",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      
      if (data && data.address) {
        const addressDetails = data.address;
        
        // Extract city name
        const cityName = addressDetails.city || addressDetails.town || addressDetails.village || '';
        
        // Clean the address to remove duplicates
        const rawAddress = data.display_name || '';
        const cleanedAddress = cleanAddressString(rawAddress, cityName);
        
        console.log('📍 Address Cleaning:', {
          raw: rawAddress,
          cleaned: cleanedAddress,
          city: cityName
        });
        
        return {
          address: cleanedAddress,
          pincode: addressDetails.postcode || '',
          state: addressDetails.state || addressDetails.region || '',
          city: cityName,
        };
      }
      
      return null;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      throw new Error("Unable to fetch address details");
    }
  }, [cleanAddressString]);

  // Handle Location Permission
  const handleLocationPermission = useCallback(async () => {
    setShowPermissionModal(false);
    try {
      await requestLocationPermission();
      // After permission granted, get location
      setTimeout(() => {
        getCurrentLocation();
      }, 1000);
    } catch (error) {
      console.error("Permission error:", error);
    }
  }, [requestLocationPermission, getCurrentLocation]);

  return {
    currentLocation,
    setCurrentLocation,
    isLoadingLocation,
    showPermissionModal,
    setShowPermissionModal,
    getCurrentLocation,
    reverseGeocode,
    handleLocationPermission,
  };
};