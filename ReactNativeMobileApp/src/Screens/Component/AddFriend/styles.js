import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light_background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: hp(2),
    backgroundColor: color.lightgray,
    borderRadius: wp(1),
  },
  backBtnStyle: {
    position: 'absolute',

    marginHorizontal: wp(5),
    zIndex: 100,
  },

  tabTextStyle: {
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(14),
  },
  scrollTabStyle: {borderBottomWidth: 0},
});

export default styles;
