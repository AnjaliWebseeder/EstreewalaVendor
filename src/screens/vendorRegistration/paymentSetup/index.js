import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';

export default function PaymentSetup({ navigation }) {
  const [qrImage, setQrImage] = useState(null);

  const submit = () => navigation.navigate('VendorRegistration');

  const handleUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setQrImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Payment Setup" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {/* Title + Subtitle */}
        <Text style={styles.title}>Payment Setup</Text>
        <Text style={styles.subtitle}>Upload QR Code</Text>
        <Text style={styles.subtitleStyle}>
        Add your payment QR code so customers can scan and pay.
        </Text>

        {/* QR Placeholder */}
        <View style={styles.qrWrapper}>
          {qrImage ? (
            <Image
              source={{ uri: qrImage }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          ) : (
            <Icon name="qrcode-scan" size={100} color="#999" />
          )}

          {/* Floating Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleUpload}>
            <MaterialIcons name="edit" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button at bottom */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
