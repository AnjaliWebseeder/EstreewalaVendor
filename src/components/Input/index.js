// components/Input.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';

const CustomInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType, 
  iconName,
  error // 👈 add error prop
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputWrapper,
        error && { borderColor: appColors.error, borderWidth: 1.5 } // 👈 error styling
      ]}>
        {iconName && <Icon name={iconName} size={20} color="#666" style={styles.leftIcon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={appColors.lightText}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon 
              name={isPasswordVisible ? 'eye' : 'eye-off'} 
              size={15} 
              color="#666" 
              style={styles.rightIcon} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 5 },
  label: { fontSize: 14, color: appColors.font, marginBottom: 10, fontFamily: fonts.PoppinsSemiBold },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  leftIcon: { marginRight: 8 },
  rightIcon: { marginLeft: 8 },
  input: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 10,
    fontFamily: fonts.PoppinsRegular,
    color: appColors.font,
  },
  errorText: {
    color:appColors.error,
    fontSize: 11,
    marginTop: 4,
    fontFamily: fonts.PoppinsRegular,
  }
});

export default CustomInput;
