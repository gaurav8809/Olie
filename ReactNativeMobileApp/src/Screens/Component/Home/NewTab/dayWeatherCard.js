import React from 'react';
import Moment from 'moment';
import {View, Text} from 'react-native';
import {weatherConditions} from './data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {color, hp, normalize, wp} from '../../../../Helper/themeHelper';
const DayCard = ({reading}) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);
  const imgURL = `${reading.weather[0].main}`;
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: color.gray,
      }}>
      <Text style={[styles.weatherText, {flex: 2, marginLeft: wp(2)}]}>
        {Moment(newDate).format('dddd')}
      </Text>
      <MaterialCommunityIcons
        size={wp(7)}
        name={weatherConditions[imgURL] && weatherConditions[imgURL].icon}
        color={'#f7ff51'}
        style={{flex: 1}}
      />
      <Text style={[styles.weatherText, {flex: 1}]}>
        {Math.round(reading.main.temp)} °
      </Text>
      <Text style={[styles.whiteText, {flex: 2}]}>
        {reading.weather[0].description}
      </Text>
    </View>
  );
};
export default DayCard;
