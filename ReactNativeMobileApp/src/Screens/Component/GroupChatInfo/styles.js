import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: wp(5),
    // paddingVertical: hp(1),
    backgroundColor: color.lightest_gray,
  },
  selectedContactMainView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: color.white,
  },
  selectedContactImage: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    // borderWidth: 0.5,
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
  selectedContactInnerView: {
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
  sideTextStyle: {
    flex: 1,
    color: color.green_background,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Regular,
  },
  inputContainer: {
    marginBottom: hp(2),
    marginTop: hp(2),
    backgroundColor: color.lightgray,
    borderRadius: wp(5),
    borderWidth: 0,
  },
  inputStyle: {
    fontSize: normalize(16),
    marginHorizontal: wp(1),
    borderWidth: 0,
  },
  smallText: {
    color: color.black_33,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Regular,
  },
  titleText: {
    color: color.black_33,
    fontSize: normalize(20),
    fontFamily: fonts.Lato_Bold,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: hp(1),
    right: hp(1),
    height: hp(4),
    width: hp(4),
    backgroundColor: 'rgba(255,255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(2),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    borderBottomWidth: 0.5,
    borderColor: color.gray,
    paddingVertical: hp(2),
    marginTop: 0.5,
    backgroundColor: color.white,
  },
  rowImage: {
    height: hp(2.5),
    width: hp(2.5),
    marginRight: wp(4),
  },
  boxContainer: {
    borderTopWidth: 0.5,
    borderColor: color.gray,
    marginTop: hp(4),
  },
  participantsBox: {
    // borderTopWidth: 0.5,
    // borderColor: color.gray,
    // marginTop: hp(4),
  },
  avatarStyle: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(4),
  },
});

export default styles;
