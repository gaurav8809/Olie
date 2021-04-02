import {StyleSheet} from 'react-native';
import {color, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  holeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(34,146,231,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientView: {
    flex: 1,

    alignSelf: 'center',
    width: wp(120),
    overflow: 'hidden',
    zIndex: 1000,
  },
  mapStyle: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(5),
    height: wp(5),
    backgroundColor: color.sky,
    borderRadius: 100,
  },
});

export default styles;
