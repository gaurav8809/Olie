import {StyleSheet} from 'react-native';
import {
  color,
  fonts,
  hp,
  isIOS,
  normalize,
  wp,
} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  mapStyle: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // flex: 1,
    height: hp(40),
  },
  mapContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  currentMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(5),
    height: wp(5),
    backgroundColor: color.sky,
    borderRadius: 100,
  },
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
  distanceLabel: {
    fontFamily: fonts.Lato_Regular,
    color: color.darkgray,
    fontSize: normalize(14),
    alignSelf: 'center',
  },
});

export default styles;
