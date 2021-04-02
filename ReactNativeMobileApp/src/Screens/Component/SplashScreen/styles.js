import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.green_background,
  },
  logo: {
    height: hp(20),
    width: hp(53),
  },
  textStyle: {
    color: color.white,
    fontSize: normalize(18),
    fontFamily: fonts.Lato_Regular,
  },
});

export default styles;
