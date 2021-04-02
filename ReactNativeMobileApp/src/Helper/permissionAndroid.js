import {isANDROID} from './themeHelper';
import {PermissionsAndroid} from 'react-native';
import {Alert} from 'react-native';
import Permissions, {
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const settingPermission = (permission, message) => {
  return Alert.alert(permission, message, [
    // this.state.photoPermission == 'undetermined'
    // { text: 'OK', onPress: requestLocationAndroidPermission },
    //     : { text: 'Open Settings', onPress: Permissions.openSettings },
    {
      text: 'Allow &   Open Settings',
      onPress: () => {
        return openSettings();
      },
    },
  ]);
};
export const startGpsLocation = () => {
  return RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {});
};
export const requestLocationAndroidPermission = async () => {
  if (isANDROID) {
    const readGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    const writeGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    if (
      (readGranted === PermissionsAndroid.RESULTS.DENIED ||
        readGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) &&
      (writeGranted === PermissionsAndroid.RESULTS.DENIED ||
        writeGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
    ) {
      return Permissions.checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]).then((result) => {
        // await alert(result['android.permission.ACCESS_COARSE_LOCATION']);
        if (
          result['android.permission.ACCESS_COARSE_LOCATION'] === 'denied' ||
          result['android.permission.ACCESS_FINE_LOCATION'] === 'denied'
        ) {
          return settingPermission(
            'Can we access your Location ?',
            'We need access so you can set your Location \n Please Allow and Goto Settings-> Permissions -> Select Location',
          );
        }
      });
    } else {
      return true;
    }
  } else {
    return Permissions.request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((res) => {
        if (!(res === RESULTS.GRANTED || res === RESULTS.UNAVAILABLE)) {
          settingPermission(
            'Can we access your Location ?',
            'We need access so you can set your Location \n Please Allow and Goto Settings-> Permissions -> Select Location',
          );
        } else {
          return true;
        }
      })
      .catch((e) => console.log(e));
  }
};
export const requestContactAndroidPermission = async () => {
  if (isANDROID) {
    try {
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'App needs Contact Permission',
          message:
            'Please Allow to contacts So you can use contacts in the App',
          buttonPositive: 'OK',
        },
      );
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'App needs Contact Permission',
          message:
            'Please Allow to contacts So you can use contacts in the App',
          buttonPositive: 'OK',
        },
      );
      if (
        (readGranted === PermissionsAndroid.RESULTS.DENIED ||
          readGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) &&
        (writeGranted === PermissionsAndroid.RESULTS.DENIED ||
          writeGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
      ) {
        Permissions.checkMultiple([
          PERMISSIONS.ANDROID.WRITE_CONTACTS,
          PERMISSIONS.ANDROID.READ_CONTACTS,
        ]).then((res) => {
          if (
            res['android.permission.READ_CONTACTS'] === 'denied' ||
            res['android.permission.WRITE_CONTACTS'] === 'denied'
          ) {
            Alert.alert(
              'We need Access of Contact',
              'If you wish to allow us \n Click on Settings and \nadd permission for Contact',
              [
                {
                  text: 'Denied',
                  onPress: () => {
                    // isAlertShown = false;
                  },
                },
                {
                  text: 'Allow &   Open Settings',
                  onPress: openSettings,
                },
              ],
              {cancelable: true},
            );
          }
        });
        return 1;
      } else {
        // settingPermission(
        //   'Can we access your Contacts ?',
        //   'We need access so you can use contacts here',
        // );
        return 0;
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    Permissions.check(PERMISSIONS.IOS.CONTACTS).then((res) => {
      if (!(res === RESULTS.GRANTED || res === RESULTS.UNAVAILABLE)) {
        Alert.alert(
          'We need Access of Contact',
          'If you wish to allow us \n Click on Settings and \nadd permission for Contact',
          [
            {
              text: 'Denied',
              onPress: () => {
                // isAlertShown = false;
              },
            },
            {
              text: 'Allow & Open Settings',
              onPress: openSettings,
            },
          ],
          {cancelable: true},
        );
        return 1;
      } else {
        return 0;
      }
    });
    // try {
    //   Contacts.checkPermission((err, permission) => {
    //     if (err) {
    //       throw err;
    //     }
    //
    //     // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    //     if (permission === 'undefined') {
    //       Contacts.requestPermission((err, permission) => {
    //         // ...
    //       });
    //       // return permission;
    //     }
    //     if (permission === 'authorized') {
    //       // yay!
    //       // return permission;
    //     }
    //     if (permission === 'denied') {
    //       // x.x
    //       Alert.alert(
    //         'Denial of Contact',
    //         'Due to denial of Permission We can not use your contacts here! Please allow it to use Contacts',
    //         [
    //           {
    //             text: 'Okay',
    //             onPress: () => {
    //               // isAlertShown = false;
    //             },
    //           },
    //           {text: 'Open Settings', onPress: Permissions.openSettings},
    //         ],
    //         {cancelable: true},
    //       );
    //     }
    //     return permission;
    //     // return  0;
    //   });
    // } catch (e) {
    //   console.log(e.message);
    //   // return 1;
    // }

    // return  0;
    // Permissions.request('contacts', {type: 'whenInUse'}).then((res) => {
    //   // alert(res);
    //   if (res !== 'granted') {
    //     Alert.alert(
    //       'Denial of Contact',
    //       'Due to denial of Permission We can not use your contacts here! Please allow it to use Contacts',
    //       [
    //         {
    //           text: 'Okay',
    //           onPress: () => {
    //             // isAlertShown = false;
    //           },
    //         },
    //         {text: 'Open Settings', onPress: Permissions.openSettings},
    //       ],
    //       {cancelable: true},
    //     );
    //   }
    // });
    // Permissions.request('contacts').then((response) => {
    //   console.log(response);
    //   Contacts.checkPermission((err, permission) => {
    //     if (err) {
    //       throw err;
    //     }
    //
    //     // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    //     if (permission !== 'authorized') {
    //       Contacts.requestPermission((err, permission) => {
    //         // ...
    //         Alert.alert(
    //           'Denial of Contact',
    //           'Due to denial of Permission We can not use your contacts here! Please allow it to use Contacts',
    //           [
    //             {
    //               text: 'Okay',
    //               onPress: () => {
    //                 // isAlertShown = false;
    //               },
    //             },
    //             {text: 'Open Settings', onPress: Permissions.openSettings},
    //           ],
    //           {cancelable: true},
    //         );
    //       });
    //       return 0;
    //     }
    //
    //     return 3;
    //   });
    //   // if (response !== 'granted') {
    //   //   Alert.alert(
    //   //     'Denial of Contact',
    //   //     'Due to denial of Permission We can not use your contacts here! Please allow it to use Contacts',
    //   //     [
    //   //       {
    //   //         text: 'Okay',
    //   //         onPress: () => {
    //   //           // isAlertShown = false;
    //   //         },
    //   //       },
    //   //       {text: 'Open Settings', onPress: Permissions.openSettings},
    //   //     ],
    //   //     {cancelable: true},
    //   //   );
    //   //   console.log('contact is disabled');
    //   //   return 1;
    //   // } else {
    //   //   Contacts.requestPermission((err, permission) => {});
    //   //   return 0;
    //   // }
    // });
    // return 0;
    //   }
    // });
  }
};
