import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ otp, setOtp }) => {
  const inputs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          style={styles.box}
          value={digit}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 50,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default OtpInput;
