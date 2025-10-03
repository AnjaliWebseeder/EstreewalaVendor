import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_LAUNCH_KEY = 'app_launched_before';

export const setAppLaunched = async () => {
  try {
    await AsyncStorage.setItem('appLaunched', 'true');
    console.log('App launched status set to true');
  } catch (error) {
    console.log('Error setting app launch status:', error);
  }
};

export const getAppLaunchStatus = async () => {
  try {
    const value = await AsyncStorage.getItem('appLaunched');
    console.log('App launched status:', value);
    return value === 'true';
  } catch (error) {
    console.log('Error getting app launch status:', error);
    return false;
  }
};

export const resetAppLaunchStatus = async () => {
  try {
    await AsyncStorage.removeItem(APP_LAUNCH_KEY);
  } catch (error) {
    console.error('Error resetting app launch status:', error);
  }
};