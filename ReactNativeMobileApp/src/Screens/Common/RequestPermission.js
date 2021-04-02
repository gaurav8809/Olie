import React from 'react';
import {PermissionsAndroid} from 'react-native';
export const requestAndroidPermission = async () => {
  try {
    const readGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'App needs Contact Permission',
        message: 'Please Allow to contacts So you can use contacts in the App',
        buttonPositive: 'OK',
      },
    );
    const writeGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        title: 'App needs Contact Permission',
        message: 'Please Allow to contacts So you can use contacts in the App',
        buttonPositive: 'OK',
      },
    );
    if (
      readGranted === PermissionsAndroid.RESULTS.GRANTED &&
      writeGranted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the contacts');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export default {requestAndroidPermission};
