import {StyleSheet} from 'react-native';
import {
  color,
  fonts,
  hp,
  normalize,
  wp,
} from '../../../../../../Helper/themeHelper';

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
    elevation: 26,
  },

  linearGradientBg: {
    flex: 1,
    borderRadius: wp(3),
  },

  btnBg: {flex: 1, marginVertical: hp(1)},

  titleTextStyle: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    flex: 1,
    fontSize: normalize(25),
    marginVertical: hp(0),
  },

  imageStyle: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    overflow: 'hidden',
    marginVertical: hp(2.5),
  },

  challengeTypeText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(15),
    marginVertical: hp(0),
  },

  descriptionText: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,

    fontSize: normalize(12),
    marginVertical: hp(1),
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
    flex: 1,
    borderRadius: wp(5),
    alignSelf: 'center',
    width: wp(65),
    height: hp(13),
    marginVertical: hp(2.5),
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
  containerModal: {
    flex: 1,
    paddingVertical: hp(2),
  },
  modalTitleTextStyle: {flex: 1, marginVertical: hp(2)},
});

export default styles;
