import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  popUpInfoContainer: {},
  popUpTitleText: {
    marginLeft: wp(1),
    marginRight: wp(12),
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
  popUpTimeView: {
    top: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(1),
  },
  popUpDetailsText: {
    top: hp(1),
    marginLeft: wp(1),
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(12),
    color: color.gray,
  },
  popUpButtonsView: {
    top: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popUpWebsiteBtn: {
    marginLeft: wp(1),
    paddingVertical: wp(2),
    borderColor: color.sky,
    width: wp(18),
  },
  popUpDirectionBtn: {
    marginLeft: wp(2),
    paddingVertical: wp(2),
    borderColor: color.sky,
    width: wp(20),
  },
  popUpCallBtn: {
    marginLeft: wp(2),
    paddingVertical: wp(2),
    borderColor: color.sky,
    width: wp(18),
  },
});

export default styles;
