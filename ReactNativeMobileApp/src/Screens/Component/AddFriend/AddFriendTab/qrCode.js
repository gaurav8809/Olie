import React, {useEffect} from 'react';
import {View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {hp} from '../../../../Helper/themeHelper';
import styles from './styles';
import {AddFriendByEmail, AddFriendByPhone} from '../../../../Redux/Actions/FriendsAction';
import {useDispatch} from 'react-redux';
import {setBottomTabVisibility} from '../../../../Redux/Actions/SystemAction';

export const QRCode = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBottomTabVisibility(false));
    return () => dispatch(setBottomTabVisibility(true));
  }, []);
  return (
    <View style={[styles.container]}>
      <RNCamera
        // ref={(cam) => {
        //   this.camera = cam;
        // }}
        style={{flex: 1}}
        onBarCodeRead={(data) => {
          console.log(data.data);

          dispatch(AddFriendByEmail({friend_email: data.data}))
            .then((res) => {
              console.log(res);
              //Navigate back
              //do visibility of bottom tab to on

              dispatch(setBottomTabVisibility(true));
              props.navigation.goBack();
            })
            .catch((e) => {
              alert(e);
              props.navigation.goBack();
            });
        }}>
        <BarcodeMask
          width={280}
          height={220}
          borderColor="red"
          borderWidth={2}
        />
      </RNCamera>
    </View>
  );
};
