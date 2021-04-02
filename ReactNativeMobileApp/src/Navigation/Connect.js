import React from 'react';

import {View, Text, Image, StyleSheet, Animated} from 'react-native';
// import styles from './styles';
// import {AppHeader} from '../../Common';
import {connect_button} from '../Screens/Assets';
import {color, hp, wp} from '../Helper/themeHelper';

const Connect = ({}) => {
  return (
    // <View style={{top:-10,left:5, shadowOpacity: 0.4,
    //     borderRadius: Math.round((150 * 0.5) + (150 * 0.5)) / 2,
    //     width: 150 * 0.5,
    //     height: 150 * 0.5,
    //     borderWidth:1,
    //     backgroundColor:'transparent',
    //     borderColor:color.gray,
    //     opacity: 0.9,
    //     justifyContent: 'center',
    //     alignItems: 'center',}}>
    <Animated.View
      style={{
        width: 150 * 0.6,
        height: 150 * 0.5,
        top: -10,
        left: 5,

        transform: [{scaleX: 1}],
        borderBottomStartRadius: 200,
        backgroundColor: color.white,

        borderBottomEndRadius: 200,
      }}>
      <Image source={connect_button} style={styles.connectBtn} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  connectBtn: {
    position: 'absolute',
    bottom: 0,
    height: wp(20),
    width: wp(20),
    opacity: 1,

    padding: hp(3),
    // shadowOpacity: 0.4,
    // shadowColor: color.black,
    // shadowRadius: 6,
    // shadowOffset: {height: 5, width: 0},
    // backgroundColor: 'transparent',
    // borderRadius:hp(50),
    // borderColor: color.white,
    // borderWidth: 3,

    // elevation: 2,
  },
});
export default Connect;
