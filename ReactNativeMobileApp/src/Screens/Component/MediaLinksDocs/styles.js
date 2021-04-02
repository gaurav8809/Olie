import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  topView: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: hp(2),
    borderColor: color.gray,
  },
  pdfName: {
    // marginVertical: hp(0.5),
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(14),
    marginHorizontal: wp(2),
  },

  backBtn: {
    position: 'absolute',
    left: wp(4),
    bottom: hp(2),
    zIndex: 10,
  },
  headerInner: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  headerOuter: {
    borderColor: color.sky,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
  },
  headerText: {
    color: color.sky,
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Regular,
  },
  sectionHeader: {
    paddingVertical: hp(1),
    paddingLeft: wp(3),
    fontSize: normalize(14),
    fontFamily: fonts.Lato_Bold,
    color: color.black_33,
    backgroundColor: color.white,
  },
  mediaImage: {
    width: wp(23),
    height: wp(23),
  },
  mediaOuter: {
    marginBottom: wp(2),
    alignItems: 'center',
    marginHorizontal: wp(1),
    borderWidth: 0.5,
    borderColor: color.gray,
  },
  selectedImage: {
    position: 'absolute',
    bottom: wp(1),
    right: wp(1),
    zIndex: 10,
    height: wp(6),
    width: wp(6),
    borderRadius: wp(3),
    backgroundColor: color.sky,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.white,
  },
  docOuter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    marginHorizontal: wp(5),
  },
});

export default styles;
