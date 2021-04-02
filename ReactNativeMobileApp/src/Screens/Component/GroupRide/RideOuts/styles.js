import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  groupRidesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    marginVertical: hp(0.5),
    shadowOpacity: 0.6,
    backgroundColor: color.white,
    shadowColor: color.gray,
    shadowRadius: 2,
    shadowOffset: {height: 3, width: 0},
    elevation: 3,
  },
  groupRidesRowText: {
    color: color.darkgray,
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Regular,
  },
  groupRidesAvatar: {
    height: hp(7),
    width: hp(7),
    borderRadius: hp(3.5),
    overflow: 'hidden',
  },
  blackText: {
    color: color.black_33,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Bold,
  },
  whiteText: {
    color: color.white,
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Regular,
  },
  todayBtn: {
    backgroundColor: color.darkPink,
    justifyContent: 'center',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(4),
    borderWidth: 2,
    borderColor: color.darkPink,
  },
});

export default styles;
