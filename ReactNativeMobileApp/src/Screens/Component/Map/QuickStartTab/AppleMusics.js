import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  NativeModules,
} from 'react-native';
import styles from './styles';
import mainStyles from '../../Map/styles';
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {color, hp} from '../../../../Helper/themeHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AppleMusicAPI = NativeModules.AppleMusicAPI;
export const AppleMusics = (props) => {
  const insets = useSafeAreaInsets();
  const {onClose = null} = props;
  const APPLE_MUSIC_KEY =
    '-----BEGIN PRIVATE KEY-----\n' +
    'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg6vAfnVdx3xlzATM+\n' +
    'MFLcP69miUSV4R7rGjVh9bJDFLagCgYIKoZIzj0DAQehRANCAAS90Bib91sAAN0w\n' +
    '2fOVNuoEoi45Ar3pYPnQJwfXYuAmO4iGB+EkQGo+t6yRW1VdDHPCmVR46UAs3Z8N\n' +
    'd4slBM5W\n' +
    '-----END PRIVATE KEY-----';
  useEffect(() => {
    // AppleMusicAPI.initialize()
    AppleMusicAPI.initialize('8TZ2M6DG76', '8T6QJ9PDW4', APPLE_MUSIC_KEY);
    // AppleMusic.initialize('8TZ2M6DG76', '8T6QJ9PDW4', APPLE_MUSIC_KEY);
  }, []);
  useEffect(() => {
    AppleMusic.login_basic();

    // AppleMusic.login_basic()
    AppleMusic.getICloudID()
      .then((res) => {
        console.log('loginMusic', res);
      })
      .catch((error) => console.error(error));
    try {
      AppleMusic.getRecommendations()
        .then((res) => {
          console.log('Music ', res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Modal style={{flex: 1}} animationType={'slide'}>
      <View
        style={[
          styles.contactContainer,
          {paddingTop: insets.top > 0 ? insets.top : hp(1)},
        ]}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => onClose && onClose()}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>{props.title}</Text>
          <TouchableOpacity>
            <Text style={[styles.sideTextStyle]}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
