import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  headingStyle: {
    color: color.black_33,
    fontSize: normalize(20),
    fontFamily: fonts.Lato_Bold,
    marginLeft: wp(6),
    marginTop: hp(1),
  },
  labelStyle: {
    color: color.gray,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Regular,
  },
  innerContainer: {
    backgroundColor: color.white,
    marginVertical: hp(1),
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  accountContainer: {
    paddingHorizontal: wp(6),
    backgroundColor: color.white,
    paddingVertical: hp(3),
    marginVertical: hp(1),
  },
  signoutBtn: {
    backgroundColor: color.sky,
    shadowOpacity: 0.3,
    marginHorizontal: wp(25),
    marginVertical: hp(2),
  },
  underlineText: {
    color: color.black_33,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Bold,
    marginTop: hp(1),
    textDecorationLine: 'underline',
  },
});

export default styles;
