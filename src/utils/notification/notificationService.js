import messaging from '@react-native-firebase/messaging';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

export async function getFcmToken() {
  const token = await messaging().getToken();
  console.log("FCM TOKEN:", token);
  return token;
}

export function notificationListener() {
  // Foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log("Foreground message: ", remoteMessage);
  });

  // When app opened from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log("Quit state message:", remoteMessage);
      }
    });

  // When app opened from background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("Background message:", remoteMessage);
  });
}
