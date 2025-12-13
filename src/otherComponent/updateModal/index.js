import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VersionCheck from 'react-native-version-check';
import appColors from "../../theme/appColors";
import { fontSizes } from '../../theme/appConstant';

const UpdateModal = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    checkForUpdate();
  }, []);

 const checkForUpdate = async () => {
  try {
    const updateInfo = await VersionCheck.needUpdate();

    if (updateInfo?.isNeeded) {
      setStoreUrl(updateInfo.storeUrl);
      setIsUpdateAvailable(true);
    }
  } catch (e) {
    console.log('Version check error', e);
  }
};

  const handleUpdatePress = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return (
    <Modal visible={isUpdateAvailable} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsUpdateAvailable(false)}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.center}>
            <Text style={styles.title}>Update Available</Text>

            <Text style={styles.message}>
              A new version is available. Update now for the latest features!
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
              <Text style={styles.buttonText}>Update Now</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
    color: appColors.black,
  },
  message: {
    fontSize: fontSizes.FONT13,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    color: appColors.font,
  },
  button: {
    backgroundColor: appColors.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
});

export default UpdateModal;
