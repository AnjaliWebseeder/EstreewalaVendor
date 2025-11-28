import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onLocationSelect, initialLocation } = route.params || {};
  
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Android ke liye location permission check
  const checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        
        if (granted) {
          setHasLocationPermission(true);
          setLoading(false);
        } else {
          // Permission nahi hai, request karo
          requestLocationPermission();
        }
      } else {
        // iOS ke liye direct allow karo (iOS automatically prompt karega)
        setHasLocationPermission(true);
        setLoading(false);
      }
    } catch (error) {
      console.log('Permission check error:', error);
      setLoading(false);
    }
  };

  // Location permission request
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show your current position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
          showPermissionDeniedAlert();
        }
      }
      setLoading(false);
    } catch (err) {
      console.warn('Permission error:', err);
      setLoading(false);
    }
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Location Permission Required',
      'Please enable location permissions in settings to use this feature.',
      [
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings()
        },
        {
          text: 'Continue Anyway',
          onPress: () => {
            // User can still use map manually
          }
        }
      ]
    );
  };

  const getHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
    #map { height: 100vh; width: 100vw; }
    
    /* Search Container - Fixed z-index issue */
    .search-container {
      position: fixed;
      top: 50px;
      left: 15px;
      right: 15px;
      z-index: 500; /* Reduced z-index to allow zoom controls to be on top */
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    #searchInput {
      width: 100%;
      padding: 14px;
      border: none;
      font-size: 14px;
      outline: none;
    }
    .suggestions {
      display: none;
      max-height: 200px;
      overflow-y: auto;
      border-top: 1px solid #eee;
      background: white;
      z-index: 501; /* Higher than search container but lower than Leaflet controls */
    }
    .suggestion-item {
      padding: 12px 15px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      font-size: 14px;
    }
    .suggestion-item:hover {
      background: #f8f9fa;
    }
    
    /* Address Bar */
    .address-bar {
      position: fixed;
      bottom: 110px;
      left: 10px;
      right: 10px;
      background: white;
      color: #333;
      border-radius: 12px;
      padding: 15px;
      font-size: 14px;
      z-index: 500; /* Same as search container */
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center;
    }
    
    .coordinates {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      font-family: monospace;
    }
    
    /* Action Buttons */
    .action-buttons {
      position: fixed;
      bottom: 40px;
      left: 10px;
      right: 10px;
      z-index: 500; /* Same as search container */
    }
    .confirm-btn {
      width: 100%;
      background: #202120;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    /* Current Location Button - Position adjusted */
    .current-location-btn {
      position: fixed;
      bottom: 120px;
      right: 20px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 500; /* Same as search container */
      font-size: 20px;
    }

    /* Custom Markers */
    .custom-marker {
      background: #007bff;
      border: 3px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    
    .current-location-marker {
      background: #28a745;
      border: 3px solid white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    /* Permission Status */
    .permission-status {
      position: fixed;
      top: 80px;
      left: 20px;
      right: 20px;
      background: #fff3cd;
      color: #856404;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      z-index: 500; /* Same as search container */
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    /* Leaflet Control Overrides */
    .leaflet-control-zoom {
      position: fixed !important;
      top: 90px !important;
      right: 20px !important;
      left: auto !important;
      bottom: auto !important;
      border: none !important;
      border-radius: 12px !important;
      overflow: hidden !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
      z-index: 1000 !important; /* Higher than our custom elements */
    }

    .leaflet-control-zoom a {
      background: white !important;
      color: #333 !important;
      border: none !important;
      border-radius: 0 !important;
      width: 40px !important;
      height: 40px !important;
      line-height: 40px !important;
      font-size: 18px !important;
      font-weight: bold !important;
    }

    .leaflet-control-zoom a:hover {
      background: #f8f9fa !important;
    }

    .leaflet-control-zoom-in {
      border-bottom: 1px solid #eee !important;
    }

    /* Leaflet attribution */
    .leaflet-control-attribution {
      z-index: 1000 !important;
    }
  </style>
</head>
<body>
  <div class="search-container">
    <input 
      id="searchInput" 
      placeholder="Search for shops, landmarks, or addresses..." 
      type="text"
    />
    <div class="suggestions" id="suggestions"></div>
  </div>
  
  <div id="map"></div>
  
  <div class="address-bar" id="addressBar">
    <div id="addressText">Tap on map  or search to select location</div>
    <div class="coordinates" id="coordinates"></div>
  </div>
  

  
  <div class="action-buttons">
    <button class="confirm-btn" id="confirmBtn">Confirm Location</button>
  </div>

  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script>
    let map;
    let marker = null;
    let currentLocationMarker = null;
    let selectedLatLng = null;
    let searchTimeout = null;

    function initMap() {
      console.log('Initializing map...');
      
      // Start with default India view
      map = L.map('map').setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Map click event
      map.on('click', function(e) {
        setMarker(e.latlng.lat, e.latlng.lng);
        getAccurateAddress(e.latlng.lat, e.latlng.lng);
      });

      setupSearch();
      setupButtons();
      
      // Check if React Native has given us location permission
      const hasPermission = ${hasLocationPermission};
      if (hasPermission) {
        // Try to get current location automatically
        setTimeout(getCurrentLocation, 1000);
      }
    }

    function showPermissionMessage() {
      const permissionDiv = document.createElement('div');
      document.body.appendChild(permissionDiv);
      
      setTimeout(() => {
        permissionDiv.remove();
      }, 3000);
    }

    function getCurrentLocation() {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        return;
      }

      showPermissionMessage();

      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Current location found:', lat, lng);
          
          // Center map on current location
          map.setView([lat, lng], 16);
          setMarker(lat, lng);
          getAccurateAddress(lat, lng);
          
          // Add current location marker
          if (currentLocationMarker) {
            map.removeLayer(currentLocationMarker);
          }
          
          currentLocationMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'current-location-marker',
              html: '<div style="width: 100%; height: 100%; border-radius: 50%; background: #28a745;"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })
          }).addTo(map);
          
          document.getElementById('addressText').textContent = 'Current location detected';
        },
        function(error) {
          console.log('Location error:', error);
          let errorMessage = 'Could not get current location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please allow location access in app settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          
          // Send error to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'LOCATION_ERROR',
            error: errorMessage
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }

    function setupSearch() {
      const searchInput = document.getElementById('searchInput');
      const suggestionsDiv = document.getElementById('suggestions');

      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
          suggestionsDiv.style.display = 'none';
          return;
        }
        
        searchTimeout = setTimeout(() => {
          searchLocation(query);
        }, 300);
      });

      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
          suggestionsDiv.style.display = 'none';
        }
      });
    }

    function setupButtons() {
      document.getElementById('confirmBtn').addEventListener('click', confirmLocation);
      
   
    }

    function setMarker(lat, lng) {
      selectedLatLng = { lat: lat, lng: lng };
      
      if (marker) {
        map.removeLayer(marker);
      }
      
      marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 100%; height: 100%; border-radius: 50%; background: #007bff;"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(map);
      
      document.getElementById('coordinates').textContent = 
        'Lat: ' + lat.toFixed(6) + ', Lng: ' + lng.toFixed(6);
    }

    function updateAddress(text) {
      document.getElementById('addressText').textContent = text;
    }

    async function searchLocation(query) {
      try {
        const suggestionsDiv = document.getElementById('suggestions');
        
        const response = await fetch(
          \`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(query)}&addressdetails=1&limit=5\`
        );
        
        const results = await response.json();
        
        if (results && results.length > 0) {
          suggestionsDiv.innerHTML = '';
          results.forEach(place => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = place.display_name;
            item.dataset.lat = place.lat;
            item.dataset.lon = place.lon;
            suggestionsDiv.appendChild(item);
            
            item.addEventListener('click', function() {
              const lat = parseFloat(this.dataset.lat);
              const lon = parseFloat(this.dataset.lon);
              searchInput.value = this.textContent;
              suggestionsDiv.style.display = 'none';
              map.setView([lat, lon], 16);
              setMarker(lat, lon);
              getAccurateAddress(lat, lon);
            });
          });
          suggestionsDiv.style.display = 'block';
        }
      } catch (error) {
        console.log('Search error:', error);
      }
    }

    async function getAccurateAddress(lat, lng) {
      try {
        updateAddress('Getting address...');
        
        const response = await fetch(
          \`https://nominatim.openstreetmap.org/reverse?lat=\${lat}&lon=\${lng}&format=json&addressdetails=1\`
        );
        
        const data = await response.json();
        
        if (data && data.display_name) {
          updateAddress(data.display_name);
        } else {
          updateAddress('Address not available');
        }
      } catch (error) {
        updateAddress('Location: ' + lat.toFixed(4) + ', ' + lng.toFixed(4));
      }
    }

    function confirmLocation() {
      if (selectedLatLng) {
        const addressText = document.getElementById('addressText').textContent;
        
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'LOCATION_SELECTED',
          latitude: selectedLatLng.lat,
          longitude: selectedLatLng.lng,
          address: addressText
        }));
      } else {
        alert('Please select a location first');
      }
    }

    // Initialize map when ready
    document.addEventListener('DOMContentLoaded', initMap);
  </script>
</body>
</html>
`;
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('WebView Message:', data);
      
      if (data.type === 'LOCATION_SELECTED' && onLocationSelect) {
        onLocationSelect({
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address
        });
        navigation.goBack();
      }
      else if (data.type === 'LOCATION_ERROR') {
        console.log('Location error from WebView:', data.error);
        // You can show an alert if needed
      }
    } catch (error) {
      console.log('Message error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>
          Checking location permissions...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        source={{ html: getHTML() }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        onError={(error) => console.warn('WebView error:', error)}
      />
       
    

     {!hasLocationPermission && (
        <View style={styles.permissionBanner}>
          <Text style={styles.permissionText}>
            Location permission required for current location detection
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      )} 
    </View>
    </SafeAreaView>
 
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5'
  },
  webview: { 
    flex: 1 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingText: { 
    marginTop: 15, 
    fontSize: 16, 
    color: '#333',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  backButtonText: { 
    fontSize: 13.5, 
    fontWeight: '600', 
    color: '#333',
    top:0.5
  },
  permissionBanner: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    zIndex: 1000,
  },
  permissionText: {
    fontSize: 14,
    color: '#856404',
    flex: 1,
    marginRight: 10,
  },
  permissionButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SelectLocation;