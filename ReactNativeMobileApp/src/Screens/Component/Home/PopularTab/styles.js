import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  challengeItemBg: {
    flex: 1,
    marginVertical: hp(2),
    marginHorizontal: wp(5),
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
  linearGradientModalBg: {
    flex: 1,
    paddingVertical: hp(2),
  },
  modalTextHeaderView: {
    flex: 1,
    marginVertical: hp(2),
    marginHorizontal: wp(5),
  },

  linearGradientBg: {
    flex: 1,
    borderRadius: wp(3),
  },

  btnBg: {flex: 1, marginHorizontal: wp(5), marginVertical: hp(1)},

  titleTextStyle: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    // flex: 1,
    fontSize: normalize(30),
    marginVertical: hp(1),
  },

  imageStyle: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(4),
    overflow: 'hidden',
    // marginVertical: hp(1),
  },

  challengeTypeText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(15),
    marginVertical: hp(0.5),
  },

  descriptionText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    lineHeight: normalize(18),
    fontSize: normalize(12),
    marginTop: hp(0.5),
  },

  modalTextHeader: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    flex: 0.2,

    fontSize: normalize(25),
    marginVertical: hp(1),
    marginHorizontal: wp(10),
  },

  modalImageBg: {
    // flex: 1,
    borderRadius: wp(5),
    alignSelf: 'center',
    width: wp(76),
    height: hp(20),
    marginVertical: hp(2),
  },

  textModal: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(20),
    marginVertical: hp(0),
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
    justifyContent: 'flex-end',
    paddingHorizontal: wp(3),
  },
  popUpContainer: {
    overflow: 'hidden',
    borderRadius: wp(5),
  },
});

export default styles;
