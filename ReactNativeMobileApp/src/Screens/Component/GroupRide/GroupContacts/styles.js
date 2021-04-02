import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  addContactMainView: {
    // flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  addContactText: {
    fontSize: normalize(16),
    color: color.sky,
    fontFamily: fonts.Lato_Regular,
    marginVertical: hp(2),
  },
  searchMainView: {
    paddingHorizontal: wp(5),
    backgroundColor: color.white,
    paddingBottom: hp(2),
  },
  searchContainer: {
    marginBottom: hp(0.5),
    backgroundColor: color.lightgray,
    borderRadius: wp(1),
    borderWidth: 0,
  },
  searchInput: {
    fontSize: normalize(16),
    marginHorizontal: wp(1),
    fontFamily: fonts.Lato_Regular,
    borderWidth: 0,
  },
  sectionListMainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.lightest_gray,
  },
  rowStyle: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginLeft: wp(8),
    flexDirection: 'row',
    borderBottomWidth: wp(0.1),
    borderColor: color.gray,
  },
  imageRowStyle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    overflow: 'hidden',
  },
  selectedContactImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6.5),
  },
  item: {
    padding: wp(2),
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Regular,
    color: color.darkgray,
    marginHorizontal: wp(8),
  },
  logoInRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(20),
    marginRight: wp(2),
  },
  sectionHeader: {
    paddingVertical: hp(0.5),
    paddingLeft: wp(3),
    fontSize: normalize(10),
    fontFamily: fonts.Lato_Bold,
    backgroundColor: color.mediumgray,
  },
  itemSeparatorStyle: {
    height: hp(0.1),
    backgroundColor: color.gray,
    marginLeft: wp(10),
  },
});

export default styles;
