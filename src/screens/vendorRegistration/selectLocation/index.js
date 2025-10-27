import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

const SelectLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onLocationSelect, initialLocation } = route.params || {};
  
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No more location permission requests
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
    
    .search-container {
      position: fixed;
      top: 15px;
      left: 15px;
      right: 15px;
      z-index: 1000;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    #searchInput {
      width: 100%;
      padding: 15px;
      border: none;
      font-size: 16px;
      outline: none;
    }
    .suggestions {
      display: none;
      max-height: 200px;
      overflow-y: auto;
      border-top: 1px solid #eee;
      background: white;
      z-index: 1001;
    }
    .suggestion-item {
      padding: 12px 15px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .suggestion-item:hover, .suggestion-item:active {
      background: #f8f9fa;
    }
    
    .address-bar {
      position: fixed;
      bottom: 80px;
      left: 20px;
      right: 20px;
      background: white;
      color: #333;
      border-radius: 12px;
      padding: 15px;
      font-size: 14px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center;
    }
    
    .coordinates {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      font-family: monospace;
    }
    
    .action-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      z-index: 1000;
    }
    .confirm-btn {
      width: 100%;
      background: #202120ff;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .confirm-btn:hover {
      background: #218838;
    }
    .confirm-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    .location-status {
      position: fixed;
      top: 80px;
      left: 20px;
      right: 20px;
      background: #fff3cd;
      color: #856404;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      z-index: 1000;
      font-size: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .location-status.error {
      background: #f8d7da;
      color: #721c24;
    }
    .location-status.success {
      background: #d4edda;
      color: #155724;
    }

    .custom-marker {
      background: #007bff;
      border: 3px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
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
    <div id="addressText">Tap on map to select location</div>
    <div class="coordinates" id="coordinates"></div>
  </div>
  
  <div class="action-buttons">
    <button class="confirm-btn" id="confirmBtn">Confirm Location</button>
  </div>

  <div class="location-status" id="locationStatus" style="display: none;"></div>

  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script>
    let map;
    let marker = null;
    let selectedLatLng = null;
    let searchTimeout = null;
    let initialLocation = null;

    // Check if we have initial location from React Native
    if (window.initialLocationFromRN) {
      initialLocation = window.initialLocationFromRN;
      console.log('Got initial location:', initialLocation);
    }

    function initMap() {
      console.log('Initializing map...');
      
      // Start with initial location or default India view
      if (initialLocation) {
        map = L.map('map').setView([initialLocation.lat, initialLocation.lng], 16);
        setMarker(initialLocation.lat, initialLocation.lng);
        updateAddress(initialLocation.address);
        showSimpleMessage('Previously selected location loaded');
      } else {
        map = L.map('map').setView([20.5937, 78.9629], 5);
      }

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      setupMapEvents();
      setupSearch();
      setupButtons();

      if (!initialLocation) {
        showSimpleMessage('Search for your location or tap on map to select');
      }
    }

    function setupMapEvents() {
      map.on('click', function(e) {
        setMarker(e.latlng.lat, e.latlng.lng);
        getAccurateAddress(e.latlng.lat, e.latlng.lng);
        hideLocationStatus();
      });
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

      searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
          searchLocation(query);
        }
      });

      suggestionsDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-item')) {
          const lat = parseFloat(e.target.dataset.lat);
          const lon = parseFloat(e.target.dataset.lon);
          searchInput.value = e.target.textContent;
          suggestionsDiv.style.display = 'none';
          map.setView([lat, lon], 16);
          setMarker(lat, lon);
          getAccurateAddress(lat, lon);
          hideLocationStatus();
        }
      });

      // Hide suggestions when clicking outside
      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
          suggestionsDiv.style.display = 'none';
        }
      });
    }

    function setupButtons() {
      document.getElementById('confirmBtn').addEventListener('click', confirmLocation);
    }

    function showLocationStatus(message, type = 'info') {
      const statusEl = document.getElementById('locationStatus');
      statusEl.textContent = message;
      statusEl.className = 'location-status ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : '');
      statusEl.style.display = 'block';
      
      if (type === 'success') {
        setTimeout(hideLocationStatus, 3000);
      }
    }

    function hideLocationStatus() {
      document.getElementById('locationStatus').style.display = 'none';
    }

    function showSimpleMessage(message) {
      showLocationStatus(message, 'info');
      setTimeout(hideLocationStatus, 4000);
    }

    function setMarker(lat, lng) {
      selectedLatLng = { lat: lat, lng: lng };
      
      if (marker) {
        map.removeLayer(marker);
      }
      
      // Create custom marker
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
        
        showLocationStatus('🔍 Searching for locations...', 'info');
        
        const response = await fetch(
          \`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(query)}&addressdetails=1&limit=8&countrycodes=in\`
        );
        
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        
        const results = await response.json();
        
        if (results && results.length > 0) {
          // Remove duplicates by display_name
          const uniqueResults = results.filter(
            (place, index, self) =>
              index === self.findIndex(p => p.display_name === place.display_name)
          );

          suggestionsDiv.innerHTML = '';
          uniqueResults.forEach(place => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = place.display_name;
            item.dataset.lat = place.lat;
            item.dataset.lon = place.lon;
            suggestionsDiv.appendChild(item);
          });
          suggestionsDiv.style.display = 'block';
          hideLocationStatus();
        } else {
          suggestionsDiv.style.display = 'none';
          showLocationStatus('❌ No locations found. Try different search terms.', 'error');
        }
      } catch (error) {
        console.log('Search error:', error);
        suggestionsDiv.style.display = 'none';
        showLocationStatus('❌ Search failed. Please check internet connection.', 'error');
      }
    }

    async function getAccurateAddress(lat, lng) {
      try {
        updateAddress('Getting address details...');
        
        const response = await fetch(
          \`https://nominatim.openstreetmap.org/reverse?lat=\${lat}&lon=\${lng}&format=json&addressdetails=1&zoom=18\`
        );
        
        if (!response.ok) {
          throw new Error('Address request failed');
        }
        
        const data = await response.json();
        
        if (data && data.display_name) {
          let address = data.display_name;

          // Remove duplicate or similar consecutive parts (case-insensitive)
          const seen = new Set();
          address = address
            .split(',')
            .map(part => part.trim())
            .filter(part => {
              const normalized = part.toLowerCase();
              if (seen.has(normalized)) return false;
              seen.add(normalized);
              return true;
            })
            .join(', ');

          updateAddress(address);
        } else {
          updateAddress('Address not available');
        }
      } catch (error) {
        console.log('Address fetch error:', error);
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
        alert('Please select a location first by tapping on the map or searching.');
      }
    }

    // Initialize map when ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMap);
    } else {
      initMap();
    }
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
        console.log('📍 Location selected in SelectLocation:', data);
        onLocationSelect({
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address
        });
        navigation.goBack();
      }
      // Removed location permission error handling
    } catch (error) {
      console.log('Message error:', error);
    }
  };

  const handleWebViewLoad = () => {
    if (initialLocation && webViewRef.current) {
      setTimeout(() => {
        const script = `
          window.initialLocationFromRN = {
            lat: ${initialLocation.latitude},
            lng: ${initialLocation.longitude},
            address: '${initialLocation.address.replace(/'/g, "\\'")}'
          };
          console.log('Initial location injected:', window.initialLocationFromRN);
        `;
        webViewRef.current.injectJavaScript(script);
      }, 1000);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: getHTML() }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        onLoadEnd={handleWebViewLoad}
        onError={(error) => console.warn('WebView error:', error)}
      />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
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
  },
  loadingText: { 
    marginTop: 15, 
    fontSize: 16, 
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop:20
  },
  backButtonText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#333'
  },
});

export default SelectLocation;