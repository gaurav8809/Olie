import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  headingText: {
    color: color.sky,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Bold,
  },
  blackBoldText: {
    color: color.black_33,
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Bold,
  },
  blackText: {
    color: color.black_33,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Regular,
  },
  grayText: {
    color: color.gray,
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Regular,
  },
  profileImgMain: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(8),
    marginRight: wp(3),
  },
  profileImgSub: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(3),
    marginLeft: wp(-1.5),
    backgroundColor: color.profileImageGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.white,
    marginBottom: hp(1),
  },
  favouriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  groupContainer: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
    marginHorizontal: 0,
    marginVertical: hp(0.5),
    shadowOpacity: 0.6,
    backgroundColor: color.white,
    shadowColor: color.gray,
    shadowRadius: 2,
    shadowOffset: {height: 3, width: 0},
    elevation: 3,
  },
  favouriteHeading: {
    marginVertical: hp(1),
    marginLeft: wp(5),
  },
  favouriteFlatlist: {
    backgroundColor: color.white,
    shadowColor: color.gray,
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {height: 3, width: 0},
    elevation: 2,
  },
});

export default styles;
