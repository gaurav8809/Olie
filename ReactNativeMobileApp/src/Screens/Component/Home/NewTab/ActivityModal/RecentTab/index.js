import React from 'react';
import styles from './styles';
import {Text, View, ScrollView, Image} from 'react-native';
import {
  hp,
  wp,
  color,
  fonts,
  normalize,
} from '../../../../../../Helper/themeHelper';
import {silver_coin, gold_coin} from '../../../../../Assets';
import {ThisWeekActivity} from './thisWeekActivity';
import {BestRide} from './bestRide';
import {RankingData} from './rankingData';

export const RecentTab = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: hp(12),
        backgroundColor: color.white,
      }}>
      <View style={{marginTop: hp(3), flex: 1}}>
        <Text style={styles.RecentTopContainer}>Individual Ranking</Text>
        <View style={styles.RecentInnerContainer}>
          <View>
            <Text style={styles.RecentTopRegularText}>
              World Ranking:{' '}
              <Text
                style={{fontFamily: fonts.Lato_Bold, fontSize: normalize(12)}}>
                21
              </Text>
            </Text>
            <Text style={styles.RecentTopRegularText}>
              Stats:{' '}
              <Text
                style={{fontFamily: fonts.Lato_Bold, fontSize: normalize(12)}}>
                Silver
              </Text>
            </Text>
            <View>
              <View style={styles.RecentProgressBarContainer}>
                <View
                  style={{
                    backgroundColor: color.sky,
                    width: wp(27) * 0.5,
                    borderRadius: 5,
                  }}
                />
              </View>
              <Text style={styles.RecentProgressBarText}>250 Miles/1000</Text>
            </View>
          </View>
          <View>
            <Image source={silver_coin} style={styles.RecentCoinImage} />
          </View>
        </View>
      </View>
      <View style={{marginTop: hp(3), flex: 1}}>
        <Text style={styles.RecentTopContainer}>Group Ranking</Text>
        <View style={styles.RecentInnerContainer}>
          <View>
            <Text style={styles.RecentTopRegularText}>
              World Ranking:{' '}
              <Text
                style={{fontFamily: fonts.Lato_Bold, fontSize: normalize(12)}}>
                21
              </Text>
            </Text>
            <Text style={styles.RecentTopRegularText}>
              Stats:{' '}
              <Text
                style={{fontFamily: fonts.Lato_Bold, fontSize: normalize(12)}}>
                Gold
              </Text>
            </Text>
            <View>
              <View style={styles.RecentProgressBarContainer}>
                <View
                  style={{
                    backgroundColor: color.sky,
                    width: wp(27) * 0.5,
                    borderRadius: 5,
                  }}
                />
              </View>
              <Text style={styles.RecentProgressBarText}>2000 Miles/5000</Text>
            </View>
          </View>
          <View>
            <Image source={gold_coin} style={styles.RecentCoinImage} />
          </View>
        </View>
      </View>
      <RankingData navigation={props.navigation} />
      <ThisWeekActivity />
      <BestRide />
    </ScrollView>
  );
};
