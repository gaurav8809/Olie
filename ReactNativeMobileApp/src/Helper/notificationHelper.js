import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

export const requestPermissionForNotification = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  return null;
};

export const getDeviceToken = () => {
  return messaging()
    .getToken()
    .then((token) => {
      console.log('Device Id... ', token);
      return token;
    });
};

export const listenerForNotification = async (navigation) => {
  const goToChatScreen = (message) =>
    navigation.navigate('GroupChat', {
      data: JSON.parse(message),
    });

  const channelId = await notifee.createChannel({
    id: '123',
    name: 'Olie',
  });

  notifee.onForegroundEvent(({type, detail}) => {
    if (detail?.pressAction?.id === 'default') {
      goToChatScreen(detail?.notification?.data?.message);
    }
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    goToChatScreen(remoteMessage?.data?.message);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onMessage((remoteMessage) => {
    console.log('onMessage:', remoteMessage);

    notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      data: remoteMessage?.data,
      android: {
        channelId: channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        setTimeout(() => {
          goToChatScreen(remoteMessage?.data?.message);
        }, 200);
      }
    });
};
