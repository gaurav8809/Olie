import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
    paddingLeft: wp(5),
  },
  headerView: {
    flex: 1,
    marginHorizontal: wp(1),
    alignItems: 'flex-start',
  },
  headerTextStyle: {
    fontSize: normalize(18),
    color: color.black_33,
    fontFamily: fonts.Lato_Bold,
    textAlign: 'center',
  },
  listContainer: {
    borderBottomWidth: 0.8,
    borderColor: color.white,
    paddingVertical: hp(1.5),
    paddingLeft: wp(5),
  },
  rankingBoldText: {
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Bold,
    color: color.black_33,
  },
  rankingText: {
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Regular,
    color: color.black_33,
  },
});

export default styles;
