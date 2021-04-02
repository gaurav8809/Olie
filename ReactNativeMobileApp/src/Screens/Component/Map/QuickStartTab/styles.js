import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.light_background,
    },
  startButton: {
    backgroundColor: color.black,
    height: wp(15),
    width: wp(15),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp(7),
    right: wp(43),
    zIndex: 1000,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  contactContainer: {
    paddingHorizontal: wp(5),
    // paddingVertical: hp(1),
    backgroundColor: color.lightest_gray,
  },

  sideTextStyle: {
    flex: 1,
    color: color.sky,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Regular,
  },
  headerTextStyle: {
    color: color.black,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Bold,
  },
  contactInputContainer: {
    marginBottom: hp(2),
    backgroundColor: color.lightgray,
    borderRadius: wp(0),
    borderWidth: 0,
  },
  bottomSheetContainer: {
    height: wp(70),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    alignItems: 'center',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  bottomSheetLine: {
    marginTop: hp(1),
    backgroundColor: color.black_33,
    width: wp(24),
    height: hp(0.5),
    borderRadius: wp(10),
  },
  musicImage: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(17),
    zIndex: 1000,
  },
});

export default styles;
