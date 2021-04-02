import {StyleSheet} from 'react-native';
import {
  color,
  fonts,
  hp,
  normalize,
  wp,
} from '../../../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
  containerModal: {
    flex: 1,
    backgroundColor: color.black_33,
    padding: hp(2),
  },
  imageStyle: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  textModalTitle: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(16),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  textModalDescription: {
    fontFamily: fonts.Lato_Bold,
    color: color.white,
    fontSize: normalize(10),
    textAlign: 'center',
    alignSelf: 'center',
  },
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
  },

  btnBg: {flex: 1, marginVertical: hp(1)},

  progressStyle: {flex: 1, marginVertical: hp(2)},

  challengeTypeText: {
    fontFamily: fonts.Lato_Bold,
    color: color.black_33,
    fontSize: normalize(16),
    marginVertical: hp(0),
  },

  descriptionText: {
    fontFamily: fonts.Lato_Bold,
    color: color.gray,
    fontSize: normalize(12),
  },

  addButton: {
    width: wp(35),
    height: 30,

    paddingVertical: hp(0),
    alignSelf: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: hp(1.5),
    backgroundColor: color.sky,
  },
  progressOuter: {
    backgroundColor: color.gray + '40',
    width: wp(80),
    height: hp(1),
    borderRadius: wp(2),
    overflow: 'hidden',
  },
  linearGradientStyle: {flex: 1, width: wp(80) * 0.5},

  pointStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  displayText: {
    marginTop: hp(2),
    height: hp(4),
    justifyContent: 'center',
    borderColor: 'rgb(225,225,225)',
    borderWidth: 1,
    width: wp(28),
    alignItems: 'center',
  },
  AchievementHeaderText: {
    height: hp(8),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'rgb(225,225,225)',
    borderTopWidth: 1,
    borderBottomColor: 'rgb(225,225,225)',
    borderBottomWidth: 1,
  },
  SwitchContainer: {
    borderTopColor: 'rgb(225,225,225)',
    borderTopWidth: 1,
    padding: hp(2),
  },
  CoinImage: {
    height: wp(26),
    width: wp(26),
    flex: 1,
  },
  CoinHeaderText: {
    fontSize: normalize(10),
    fontFamily: fonts.Lato_Regular,
    color: color.gray,
  },
  BadgeMileCounter: {
    marginTop: hp(0.5),
    fontSize: normalize(9),
    color: 'rgb(182,182,182)',
    fontFamily: fonts.Lato_Regular,
  },
  BadgeTitle: {
    marginTop: hp(0.5),
    fontSize: normalize(12),
    color: color.black_33,
    fontFamily: fonts.Lato_Bold,
  },
  BadgeTextStyle: {
    marginTop: hp(0.5),
    fontSize: normalize(10),
    color: 'rgb(182,182,182)',
    fontFamily: fonts.Lato_Regular,
  },
  BadgeImage: {height: hp(10), width: hp(8), alignSelf: 'center'},
  latestBadgeText: {
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Bold,
    color: color.black_33,
  },
});

export default styles;
