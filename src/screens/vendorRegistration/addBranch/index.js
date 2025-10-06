import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  ScrollView, 
  Alert, 
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/header';
import InputField from '../../../components/InputField';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import CustomButton from '../../../components/button';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationPermissionModal from "../../../otherComponent/location/locationPermissionModal";
import AddressSection from "../../../otherComponent/location/addressSection";
import {useLocationManager} from "../../../utils/hooks/permission/useLocationManager";
import { windowHeight } from '../../../theme/appConstant';

export default function AddBranch({ navigation, route }) {
  const { addBranch, editBranch, deleteBranch } = useContext(VendorContext);
  const editingBranch = route.params?.branch;

  // Form states
  const [branchName, setBranchName] = useState(editingBranch?.branchName || '');
  const [contactFirst, setContactFirst] = useState(editingBranch?.contactFirst || '');
  const [contactLast, setContactLast] = useState(editingBranch?.contactLast || '');
  const [primary, setPrimary] = useState(editingBranch?.primary || '');
  const [whatsapp, setWhatsapp] = useState(editingBranch?.whatsapp || '');
  const [sameAsPrimary, setSameAsPrimary] = useState(editingBranch?.whatsapp === editingBranch?.primary);
  const [address, setAddress] = useState(editingBranch?.address || '');
  const [pincode, setPincode] = useState(editingBranch?.pincode || '');
  const [state, setState] = useState(editingBranch?.state || '');
  const [city, setCity] = useState(editingBranch?.city || '');
  const [errors, setErrors] = useState({});

  // Location states
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const {
    currentLocation,
    isLoadingLocation,
    showPermissionModal,
    setShowPermissionModal,
    getCurrentLocation,
    reverseGeocode,
    handleLocationPermission,
  } = useLocationManager();

  useEffect(() => {
    if (sameAsPrimary) setWhatsapp(primary);
  }, [sameAsPrimary, primary]);

  // Set initial location when editing
  useEffect(() => {
    if (editingBranch?.latitude && editingBranch?.longitude) {
      setSelectedLocation({
        latitude: editingBranch.latitude,
        longitude: editingBranch.longitude
      });
    }
  }, [editingBranch]);

  // Auto-fill address immediately when screen opens (for new branches)
  useEffect(() => {
    const initializeLocation = async () => {
      if (!editingBranch && isInitialLoad) {
        console.log('Initializing location for new branch...');
        setIsInitialLoad(false);
        try {
          // Get current location immediately
          await getCurrentLocation();
        } catch (error) {
          console.log('Initial location fetch error:', error);
        }
      }
    };

    initializeLocation();
  }, [editingBranch, isInitialLoad]);

  // Auto-fill address when location is detected
  useEffect(() => {
    if (currentLocation && !isManualEdit && !selectedLocation) {
      console.log('Auto-filling address from location:', currentLocation);
      setSelectedLocation(currentLocation);
      autoFillAddressFromLocation(currentLocation);
    }
  }, [currentLocation]);
const autoFillAddressFromLocation = async (location) => {
  try {
    if (location) {
      console.log('Reverse geocoding location:', location);
      const addressDetails = await reverseGeocode(
        location.latitude, 
        location.longitude
      );
      console.log('Address details received:', addressDetails);
      
      if (addressDetails) {
        // CLEAN THE ADDRESS BEFORE SETTING
        const cleanedAddress = cleanAddressString(addressDetails.address);
        
        console.log("CLEANED ADDRESS DETAIL IS", {
          original: addressDetails.address,
          cleaned: cleanedAddress
        });
        
        setAddress(cleanedAddress || '');
        setPincode(addressDetails.pincode || '');
        setState(addressDetails.state || '');
        setCity(addressDetails.city || '');
      }
    }
  } catch (error) {
    console.log('Auto-fill address error:', error);
  }
};

// Simple address cleaning function
const cleanAddressString = (address) => {
  if (!address) return '';
  
  // Remove duplicate words (like "Vadodara, Vadodara")
  const words = address.split(', ').filter((word, index, array) => {
    // Keep only unique consecutive location names
    if (index === 0) return true;
    const prevWord = array[index - 1];
    return !prevWord.includes(word) && !word.includes(prevWord);
  });
  
  return words.join(', ');
};

  const validate = () => {
    let newErrors = {};
    if (!branchName.trim()) newErrors.branchName = 'Branch name is required';
    if (!contactFirst.trim()) newErrors.contactFirst = 'First name is required';
    if (!contactLast.trim()) newErrors.contactLast = 'Last name is required';
    if (!primary.trim() || primary.length !== 10) newErrors.primary = 'Enter valid primary number';
    if (!sameAsPrimary && (!whatsapp.trim() || whatsapp.length !== 10))
      newErrors.whatsapp = 'Enter valid whatsapp number';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Enter valid pincode';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // Open Map for location change - FIXED VERSION
  const openMap = async () => {
    console.log('Opening map...');
    try {
      // Always try to get current location when opening map
      if (!currentLocation && !selectedLocation) {
        console.log('No location found, fetching current location...');
        await getCurrentLocation();
      }
    
    } catch (error) {
      console.log('Error opening map:', error);
      Alert.alert("Location Error", "Unable to access location services. Please check your permissions.");
    }
  };

  // Handle manual editing of address fields
  const handleManualEdit = (field, value) => {
    setIsManualEdit(true);
    switch (field) {
      case 'address':
        setAddress(value);
        if (errors.address) setErrors({ ...errors, address: null });
        break;
      case 'pincode':
        setPincode(value);
        if (errors.pincode) setErrors({ ...errors, pincode: null });
        break;
      case 'state':
        setState(value);
        if (errors.state) setErrors({ ...errors, state: null });
        break;
      case 'city':
        setCity(value);
        if (errors.city) setErrors({ ...errors, city: null });
        break;
    }
  };



  const submit = () => {
    if (!validate()) return;

    const branchData = {
      branchName,
      contactFirst,
      contactLast,
      primary,
      whatsapp: sameAsPrimary ? primary : whatsapp,
      address,
      pincode,
      state,
      city,
      latitude: selectedLocation?.latitude,
      longitude: selectedLocation?.longitude,
    };

    if (editingBranch) {
      editBranch(editingBranch.id, branchData);
    } else {
      addBranch(branchData);
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!editingBranch) return;

    Alert.alert(
      'Delete Branch',
      'Are you sure you want to delete this branch?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
            deleteBranch(editingBranch.id);
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleSameAsPrimaryToggle = (value) => {
  setSameAsPrimary(value);
  
  // Clear WhatsApp errors when enabling "same as primary"
  if (value && errors.whatsapp) {
    setErrors({...errors, whatsapp: null});
  }
};

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <Header 
          title={editingBranch ? "Edit Branch" : "Add New Branch Details"} 
          onBack={() => navigation.goBack()} 
        />
        
        <ScrollView>
          <View style={styles.container}>
            <InputField
              label="Branch Name*"
              value={branchName}
              onChangeText={(t) => { setBranchName(t); if (errors.branchName) setErrors({ ...errors, branchName: null }); }}
              placeholder="e.g. QuickClean Laundry"
              error={errors.branchName}
            />

            <InputField
              label="Contact Person's First Name*"
              value={contactFirst}
              onChangeText={(t) => { setContactFirst(t); if (errors.contactFirst) setErrors({ ...errors, contactFirst: null }); }}
              placeholder="e.g. Raj"
              error={errors.contactFirst}
            />

            <InputField
              label="Contact Person's Last Name*"
              value={contactLast}
              onChangeText={(t) => { setContactLast(t); if (errors.contactLast) setErrors({ ...errors, contactLast: null }); }}
              placeholder="e.g. Patel"
              error={errors.contactLast}
            />

            <InputField
              label="Primary Number*"
              value={primary}
              keyboardType="phone-pad"
              onChangeText={(t) => { setPrimary(t); if (errors.primary) setErrors({ ...errors, primary: null }); }}
              placeholder="e.g. 9876543210"
              error={errors.primary}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Same as primary number</Text>
            <Switch
  value={sameAsPrimary}
  onValueChange={handleSameAsPrimaryToggle}
  trackColor={{ false: appColors.border, true: appColors.blue }}
  thumbColor={appColors.white}
/>
            </View>

            {!sameAsPrimary && (
              <InputField
                label="Whatsapp Number*"
                value={whatsapp}
                keyboardType="phone-pad"
                onChangeText={(t) => { setWhatsapp(t); if (errors.whatsapp) setErrors({ ...errors, whatsapp: null }); }}
                placeholder="e.g. 9876543210"
                error={errors.whatsapp}
              />
            )}

            {/* Address Section with Map Button */}
            <AddressSection
              address={address}
              onAddressChange={(t) => handleManualEdit('address', t)}
              onOpenMap={openMap}
              error={errors.address}
              showChangeButton={true}
              isLoadingLocation={isLoadingLocation}
            />

            <InputField
              label="Pincode*"
              value={pincode}
              keyboardType="numeric"
              onChangeText={(t) => handleManualEdit('pincode', t)}
              placeholder="e.g. 380001"
              error={errors.pincode}
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <InputField
                  label="State*"
                  value={state}
                  onChangeText={(t) => handleManualEdit('state', t)}
                  placeholder="e.g. Gujarat"
                  error={errors.state}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="City*"
                  value={city}
                  onChangeText={(t) => handleManualEdit('city', t)}
                  placeholder="e.g. Ahmedabad"
                  error={errors.city}
                />
              </View>
            </View>
            {editingBranch && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Branch</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <CustomButton buttonContainerStyle={{marginHorizontal:windowHeight(15),marginBottom:10}} title={editingBranch ? 'Update' : 'Submit'} onPress={submit} />
        {/* Permission Modal */}
        <LocationPermissionModal
          visible={showPermissionModal}
          onCancel={() => setShowPermissionModal(false)}
          onAllow={handleLocationPermission}
        />
      </View>
    </SafeAreaView>
  );
}