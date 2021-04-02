import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {color, hp, wp} from '../../Helper/themeHelper';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export const SwappableBottomPopUp = ({
  children = <View />,
  containerStyle = {},
  expandHeight = 30,
}) => {
  let [animVal] = useState(new Animated.Value(hp(120)));
  let [expanded, setExpanded] = useState(false);

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: hp(expanded ? expandHeight : 60),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded]);
  const onSwipe = (gestureName, gestureState) => {

    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        onSwipeUp();
        break;
      case SWIPE_DOWN:
        onSwipeDown();
        break;
    }
  };
  const onSwipeUp = () => {
    setExpanded(true);
  };
  const onSwipeDown = () => {
    setExpanded(false);
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      config={config}
      style={{
        ...styles.rowStyle,
        flex: 0,
        // height: expanded ? hp(100) : hp(30),
      }}>
      <Animated.View>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.bottomSheetContainer,
            containerStyle,
            {transform: [{translateY: animVal}]},
          ]}>
          <View style={styles.bottomSheetLine} />
          {children}
        </TouchableOpacity>
      </Animated.View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: wp(70),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -540,
    width: wp(100),
    alignItems: 'center',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetLine: {
    marginTop: hp(1),
    backgroundColor: color.black_33,
    width: wp(24),
    height: hp(0.5),
    borderRadius: wp(10),
  },
  contentContainer: {
    backgroundColor: color.white,
    height: hp(25),
    width: wp(100),
  },
  closeBtn: {
    alignSelf: 'flex-end',
    right: wp(2),
    top: hp(1),
  },
});
