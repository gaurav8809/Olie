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
    backgroundColor: color.sky,
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
  selectedParticipantMainView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(6),
    marginTop: hp(3),
  },
  groupNameInputContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: color.gray,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    marginLeft: wp(5),
    marginTop: hp(0.5),
    height: hp(7),
  },
  groupDateInputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
    justifyContent: 'center',
    marginLeft: wp(5),
    height: hp(7),
  },
  selectedGroupImage: {
    width: '35%',
    height: '35%',
    // borderWidth: 0.5,
  },
  imageGroupStyle: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.light_background,
    overflow: 'hidden',
  },
  imageSpaceStyle: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    // borderWidth: 0.5,
  },
  sideTextStyle: {
    flex: 1,
    color: color.green_background,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Regular,
  },
  selectedContactButtonView: {
    height: hp(2),
    width: hp(2),
    backgroundColor: color.sky,
    borderRadius: hp(2),
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedParticipantImage: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    // borderWidth: 0.5,
  },
  selectedContactMainView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  selectedContactInnerView: {
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
});

export default styles;
