import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {color, wp} from '../../../../../../Helper/themeHelper';
import {toHHMMSS} from '../../../../../../Helper/validation';
import React from 'react';
import {useSelector} from 'react-redux';

export const ThisWeekActivity = (props) => {
  const activities = useSelector((state) => state.activities.activities);
  if (!activities) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={[styles.trackingStyle]}>
        <View style={styles.textTrackingStyle}>
          <Text style={styles.titleText}>This Week</Text>

          <Text style={styles.milesText}>
            {' '}
            {activities?.distance?.toFixed(2) ?? '00.00'} {' miles'}
          </Text>

          <Text style={styles.smallText}>Total Distance</Text>
        </View>
        <View style={{flex: 0.4, justifyContent: 'space-between'}}>
          <View style={styles.detailTrackingContainer}>
            <View style={{flex: 1, paddingHorizontal: wp(5)}}>
              <Text style={styles.measuredText}>
                {activities?.speed?.toFixed(2) + ' mph' ?? '0.0 mph'}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', color: color.gray},
                ]}>
                speed
              </Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: wp(3)}}>
              <Text style={styles.measuredText}>
                {activities && activities.time
                  ? toHHMMSS(activities.time)
                  : '00:00:00'}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', color: color.gray},
                ]}>
                Time
              </Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: wp(4)}}>
              <Text style={styles.measuredText}>
                {activities?.calories ?? '00000'}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', color: color.gray},
                ]}>
                Calories
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
