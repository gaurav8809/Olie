import {StyleSheet} from 'react-native';
import {
  color,
  fonts,
  hp,
  normalize,
  wp,
} from '../../../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(3),
    flex: 1,
    backgroundColor: color.white,
  },

  trackingStyle: {
    flex: 0.5,
    backgroundColor: color.white,
    marginVertical: hp(1),
    borderRadius: wp(1),
  },
  textTrackingStyle: {
    flex: 0.7,
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: fonts.Lato_Bold,
    color: color.black_33,
    fontSize: normalize(20),
    alignSelf: 'center',
  },

  milesText: {
    fontFamily: fonts.Lato_Regular,
    color: color.black_33,
    fontSize: normalize(40),
    alignSelf: 'center',
    marginVertical: hp(1),
  },

  smallText: {
    fontFamily: fonts.Lato_Regular,
    color: color.black_33,
    fontSize: normalize(12),
    alignSelf: 'center',
  },

  measuredText: {
    marginTop: hp(6),
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(16),
    color: color.black_33,
    alignSelf: 'center',
  },

  detailTrackingContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: wp(2),
  },
  RecentTopContainer: {
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(12),
    alignSelf: 'center',
  },
  RecentInnerContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: hp(2),
    paddingHorizontal: wp(8.5),
    justifyContent: 'space-between',
  },
  RecentTopRegularText: {
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(12),
    marginVertical: hp(0.5),
  },
  RecentProgressBarContainer: {
    marginVertical: hp(0.5),
    alignSelf: 'center',
    flexDirection: 'row',
    height: hp(0.5),
    width: wp(27),
    backgroundColor: color.gray,
    borderRadius: 5,
  },
  RecentProgressBarText: {
    alignSelf: 'flex-end',
    fontFamily: fonts.Lato_Regular,
    color: color.gray,
    fontSize: normalize(12),
  },
  RecentCoinImage: {
    height: wp(17.6),
    width: wp(17.6),
    flex: 1,
    resizeMode: 'contain',
  },
  RecentMiddleContainer: {
    marginTop: hp(3),
    borderTopColor: 'rgb(225,225,225)',
    borderTopWidth: 1,
  },
  RecentHeaderText: {
    marginTop: hp(2),
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(12),
  },
  ViewRankingHeaderText: {
    marginTop: hp(3),
    alignSelf: 'center',
    width: wp(45),
    backgroundColor: color.sky,
    borderRadius: 5,
    shadowOpacity: 0.3,
  },
  RankingText: {
    color: color.white,
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(12),
  },
  FriendsContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(3),
    flex: 1,
    width: wp(20),
  },
  FriendsImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    // borderWidth: 0.5,
  },
  RankContainer: {
    height: hp(2.5),
    width: hp(2.5),
    backgroundColor: color.sky,
    borderRadius: hp(2.5),
    borderWidth: wp(0.5),
    borderColor: color.white,
    position: 'absolute',
    top: -wp(0.5),
    left: -wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  RightDownContainer: {
    height: hp(4),
    width: hp(2),
    borderRadius: hp(2),
    position: 'absolute',
    bottom: -wp(1),
    right: -wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
