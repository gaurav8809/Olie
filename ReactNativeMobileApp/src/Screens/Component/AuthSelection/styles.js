import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.green_background,
  },
  upperContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(20),
  },
  bottomContainer: {
    paddingBottom: hp(10),
    paddingHorizontal: wp(16),
  },
  logo: {
    height: hp(12),
    width: hp(35),
  },
  textStyle: {
    color: color.white,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Regular,
  },
  blackText: {
    color: color.black_33,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Bold,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(2),
  },
  borderBtn: {
    marginTop: hp(3),
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  rememberMeView: {
    marginBottom: hp(3),
  },
  loginBtn: {
    marginHorizontal: wp(6),
  },
  facebookIcon: {
    position: 'absolute',
    left: wp(4),
  },
  socialIcon: {
    backgroundColor: color.black_33,
    padding: hp(0.6),
    borderRadius: hp(2.5),
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(8),
    marginTop: hp(3),
  },
});

export default styles;
