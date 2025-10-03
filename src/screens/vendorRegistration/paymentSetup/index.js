import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';
import { VendorContext } from '../../../utils/context/vendorContext';
import Header from '../../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentSetup({navigation,route}) {
 const { qrImage, setQrImage } = useContext(VendorContext);
  const { showHeaderBar } = route?.params || {}; // Safely access params
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
      <View style={[styles.container,{padding : showHeaderBar ? 0 : 20}]}>
     {showHeaderBar &&   <Header title={"Payment Setup"}  onBack={() => navigation.goBack() }/>}
        <View style={showHeaderBar && styles.centerView}>
            <View >
          {qrImage ? (
            <View style={styles.qrWrapper}>
            <Image
              source={{ uri: qrImage }}
              style={styles.qrImage}
              resizeMode="contain"
            />
            </View>
          ) : (
             <View style={styles.qrWrapper}>
            <Icon name="qrcode-scan" size={100} color="#999" />
            </View>
          )}

          {/* Floating Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleUpload}>
            <MaterialIcons name="edit" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        </View> 
        {/* QR Placeholder */}
       
      </View>

     
    </View>
    </SafeAreaView>
  );
}
