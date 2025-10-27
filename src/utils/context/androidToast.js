// utils/toast.js
import { ToastAndroid, Platform, Alert } from 'react-native';

export const showToast = (message, type = 'info') => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    // For iOS, you can use Alert or any other toast library
    Alert.alert(
      type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Info',
      message,
      [{ text: 'OK' }]
    );
  }
};