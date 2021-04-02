import {StyleSheet} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rentalBottomPopUp: {},
  popUpTitleText: {
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(25),
    fontWeight: 'bold',
  },
  popUpDetailsText: {
    top: hp(1),
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(15),
    color: color.gray,
  },
  popUpWebsiteBtn: {
    paddingVertical: wp(2),
    borderColor: color.sky,
    width: wp(25),
  },
  popUpDirectionBtn: {
    left: wp(3),
    paddingVertical: wp(2),
    borderColor: color.sky,
    width: wp(25),
  },
});

export default styles;
