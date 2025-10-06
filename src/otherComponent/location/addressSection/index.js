import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { styles } from "../styles";

const AddressSection = ({ 
  address, 
  onAddressChange, 
  error,
}) => {
  return (
    <View style={styles.addressSection}>
      <View style={styles.addressHeader}>
        <Text style={styles.label}>Address*</Text>
      </View>
      
      <TextInput
        style={[styles.input, error && styles.inputError, styles.addressInput]}
        value={address}
        onChangeText={onAddressChange}
        placeholder="Full address will auto-fill from map selection"
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <Text style={styles.helperText}>
        Address will be automatically filled. You can also edit manually.
      </Text>
    </View>
  );
};

export default AddressSection;