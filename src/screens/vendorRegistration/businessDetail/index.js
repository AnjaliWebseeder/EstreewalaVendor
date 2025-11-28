import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from "../../../components/InputField";
import appColors from '../../../theme/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../styles";

const BusinessDetails = ({
  businessName,
  setBusinessName,
  selectedLocation,
  setSelectedLocation,
}) => {

  const navigation = useNavigation();

  React.useEffect(() => {
    if (businessName.trim() && selectedLocation?.address) {
    }
  }, [businessName, selectedLocation]);

  const handleLocationSelect = (locationData) => {
    console.log("📍 Location selected in BusinessDetails:", locationData);
    setSelectedLocation(locationData);
  };

  const handleAddressPress = () => {
    navigation.navigate('SelectLocation', { 
      onLocationSelect: handleLocationSelect,
      initialLocation: selectedLocation 
    });
  };


 return (
    <View style={styles.stepContainer}>
      {/* Business Name */}
      <InputField
        label="Business Name*"
        value={businessName}
        onChangeText={text => setBusinessName(text)}
        placeholder="Enter Business Name"
        inputStyle={styles.largeInput}
        labelStyle={styles.largeLabel}
      />

      {/* Laundry Shop Address */}
      <Text style={styles.largeLabel}>Laundry Shop Address*</Text>
      <TouchableOpacity
        onPress={handleAddressPress}
        style={{
          borderWidth: 1,
          borderColor: appColors.border,
          borderRadius: 10,
          padding: 12,
          marginTop: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 9
        }}
      >
        <Text style={{ 
          color: selectedLocation?.address ? appColors.font : appColors.placeholder,
          flex: 1 
        }}>
          {selectedLocation?.address || 'Select Laundry Shop Address'}
        </Text>
        <Icon name="location-outline" size={20} color={appColors.secondary} />
      </TouchableOpacity>
    </View>
  );
};


export default BusinessDetails;