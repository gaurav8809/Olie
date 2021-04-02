import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  challengeItemBg: {
    flex: 1,
    marginVertical: hp(2),
    marginHorizontal: wp(6),
    borderRadius: hp(10),
    shadowColor: 'rgba(0,0,0,0.97)',
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 20.84,
    elevation: 25,
  },
  btnRideOut: {
    backgroundColor: color.darkPink,
    marginVertical: hp(1),
    justifyContent: 'center',
    paddingVertical: hp(0.5),
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderWidth: hp(0),
  },
  btnRideOutText: {
    color: color.white,
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(10),
  },
  linearGradientModalBg: {flex: 1},

  linearGradientBg: {
    flex: 1,
    borderRadius: wp(3),
    paddingHorizontal: wp(5),
  },
  modalTextHeaderView: {
    flex: 1,
    marginVertical: hp(2),
    marginHorizontal: wp(5),
  },

  btnBg: {flex: 1, marginVertical: hp(2)},

  popUpContainer: {
    overflow: 'hidden',
    borderRadius: wp(5),
  },

  popupContainer: {
    overflow: 'hidden',
    borderRadius: wp(5),
    // margin: wp(27),
    // marginHorizontal: wp(5),
  },
  titleTextStyle: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    // flex: 1,
    fontSize: normalize(30),
    // marginVertical: hp(0),
  },

  imageStyle: {
    borderRadius: wp(5),
    // alignSelf: 'center',
    width: wp(78),
    height: hp(15),
    marginVertical: hp(2),
  },

  challengeTypeText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(14),
  },

  descriptionText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(12),
    marginTop: hp(1),
  },

  modalImageBg: {
    // flex: 1,
    borderRadius: wp(5),
    alignSelf: 'center',
    width: wp(78),
    height: hp(25),
    marginVertical: hp(2),
  },

  textModal: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(20),
    marginBottom: hp(1),
    marginHorizontal: wp(10),
  },

  modalTextHeader: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    flex: 0.2,
    fontSize: normalize(25),
    marginVertical: hp(1),
    marginHorizontal: wp(10),
  },

  modalDescription: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(15),
    marginVertical: hp(1),
    marginHorizontal: wp(10),
  },

  buttonLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp(3),
  },
});

export default styles;
