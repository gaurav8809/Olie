import React, {useEffect} from 'react';
import {View, StyleSheet, Modal, UIManager} from 'react-native';
import {color, hp, isANDROID, wp} from '../../Helper/themeHelper';

const PopUp = (props) => {
  const {
    children = <View />,
    visible = false,
    onRequestClose = null,
    containerStyle = null,
    isAnimated = true,
    position = null,
    animationType = 'fade',
  } = props;

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: isAnimated
              ? 'rgba(255, 255, 255, 0.75)'
              : color.transparent,
          },
        ]}>
        <View
          style={[
            isAnimated && styles.shadowStyle,
            isAnimated || isANDROID
              ? {
                  top: hp(15),
                  left: wp(6),
                  height: isANDROID ? hp(80) : hp(70),
                  width: wp(88),
                }
              : {
                  top: position?.pageY,
                  left: position?.pageX,
                  height: position?.height,
                  width: position?.width,
                },
            containerStyle,
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  innerContainer: {
    // backgroundColor: color.white,
    height: isANDROID ? hp(80) : hp(70),
    width: wp(80),
  },
  shadowStyle: {
    shadowOpacity: 0.4,
    shadowColor: color.black,
    shadowRadius: 6,
    shadowOffset: {height: 5, width: 0},
    elevation: 2,
  },
});

export {PopUp};
