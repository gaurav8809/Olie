import React from 'react';
import {StyleSheet} from 'react-native';
import {hp, wp, isANDROID} from '../../Helper/themeHelper';
import RadialGradient from 'react-native-radial-gradient';
import {RNHoleView} from 'react-native-hole-view';

const WhiteHole = (props) => {
  const {holeData = {}} = props;
  return (
    <RNHoleView
      style={styles.holeView}
      holes={[
        {
          x: wp(13),
          y: hp(17),
          width: wp(90),
          height: wp(80),
          borderRadius: wp(35),
          opacity: 1,
          ...holeData,
        },
      ]}>
      <RadialGradient
        style={styles.gradientView}
        colors={
          isANDROID
            ? ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255,1)']
            : [
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255,0.85)',
                'rgba(255, 255, 255,0.9)',
                'rgba(255, 255, 255,1)',
              ]
        }
        stops={isANDROID ? [0.5, 1] : [0.5, 0.8, 0.85, 1]}
        center={[wp(50), hp(37)]}
        radius={wp(100)}
      />
    </RNHoleView>
  );
};
const styles = StyleSheet.create({
  gradientView: {
    flex: 1,
    alignSelf: 'center',
    width: wp(100),
    overflow: 'hidden',
    zIndex: 1000,
  },
  holeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(34,146,231,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {WhiteHole};
