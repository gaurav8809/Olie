import React from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import styles from './styles';
import {color, hp, wp} from '../../../../Helper/themeHelper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {joinGroupSocket} from '../../../../Socket';
import {DefaultProfileImage} from '../../../Common';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const RideOuts = ({navigation}) => {
  let RideOutArr = useSelector((state) => state.groups.groupRideoutList);
  let authToken = useSelector((state) => state.user.authToken);

  const renderRideOuts = ({item, index}) => {
    const isToday = moment(item.start_time, 'YYYY-MM-DD').isSame(moment(), 'D');
    return (
      <TouchableOpacity
        style={[styles.groupRidesRow, {paddingRight: wp(3)}]}
        onPress={() => {
          // joinGroupSocket({auth_token: authToken, group_id: item.group_id});
          // navigation.navigate('GroupChat', {
          //   fromRideOut: true,
          //   data: item,
          // });
        }}>
        {item?.group_ride_out_image ? (
          <Image
            source={{
              uri: item.group_ride_out_image,
            }}
            style={styles.groupRidesAvatar}
          />
        ) : (
          <DefaultProfileImage
            name={item?.short_name}
            style={styles.groupRidesAvatar}
          />
        )}
        <View style={{flex: 1, marginLeft: wp(3)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.blackText}>{item.group.group_name}</Text>
            <View
              style={[
                styles.todayBtn,
                isToday || {backgroundColor: color.white},
              ]}>
              <Text
                style={[styles.whiteText, isToday || {color: color.darkPink}]}>
                {isToday
                  ? 'Starts Today'
                  : moment(item.start_time, 'YYYY-MM-DD').fromNow(true) +
                    ' to start'}
                {/*Add Days to start logic*/}
              </Text>
            </View>
          </View>
          {item.distance && item.distance !== '' && (
            <Text style={[styles.groupRidesRowText, {marginTop: hp(0.5)}]}>
              {item.distance}
            </Text>
          )}
          {item.group.total_participants && (
            <Text style={styles.groupRidesRowText}>
              {item.group.total_participants + ' participants'}
            </Text>
          )}
          {item.sponsore_name && item.sponsore_name !== '' ? (
            <Text style={styles.groupRidesRowText}>
              {'Event sponsored by: ' + item.sponsore_name}
            </Text>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={RideOutArr}
          renderItem={renderRideOuts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{paddingVertical: hp(1)}}
        />
      </View>
    </ScrollView>
  );
};
