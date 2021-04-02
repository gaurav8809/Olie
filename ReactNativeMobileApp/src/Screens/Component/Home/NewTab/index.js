import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {Activity} from './activity';
import {Navigation} from './navigation';
import {Weather} from './weather';
import {RepairShops} from './repairshop';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  disconnectSocket,
  fetchGroupsSocket,
  initializeSocket,
  joinGroupSocket,
  loadGroupsSocket,
} from '../../../../Socket';
import {DefaultProfileImage} from '../../../Common';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ranking} from './ranking';
import {silver_coin} from '../../../Assets';

export const NewTab = ({navigation}) => {
  let authToken = useSelector((state) => state.user.authToken);

  const groupData = useSelector((state) => state.groups.groupList);
  const rideOutList = useSelector((state) => state.groups.groupRideoutList);

  const [groupList, setGroupList] = useState([...groupData]);

  useEffect(() => {
    setGroupList([...groupData]);
  }, [groupData]);

  useEffect(() => {
    initializeSocket();
    fetchGroupsSocket({auth_token: authToken, is_ride_out: false});
    loadGroupsSocket((data) => {
      let list = _.sortBy(
        data?.groups ?? [],
        (x) => new Date(x?.group?.display_time),
      );
      setGroupList([...list.reverse()]);
    });
    // return () => disconnectSocket();
  }, []);

  const renderGroupRidesItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.groupRidesRow}
        onPress={() => {
          navigation.navigate('GroupChat', {data: item});
        }}>
        {(item.group.group_image && (
          <Image
            source={{
              uri: item.group.group_image,
            }}
            style={styles.groupRidesAvatar}
          />
        )) || (
          <DefaultProfileImage
            name={item.group.short_name}
            style={styles.groupRidesAvatar}
          />
        )}
        <View style={{flex: 1, marginLeft: wp(3)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(0.5),
            }}>
            <Text style={[styles.blackText, {flex: 1}]} numberOfLines={2}>
              {item.group.group_name}
            </Text>
            <Text style={styles.groupRidesRowText}>
              {moment(item?.group?.display_time).format(
                moment(item?.group?.display_time, 'YYYY-MM-DD').isSame(
                  moment(),
                  'D',
                )
                  ? 'HH:mm'
                  : 'DD/MM/YYYY HH:mm',
              )}
            </Text>
          </View>
          {item?.group?.description && item.group.description !== '' ? (
            <Text
              style={[styles.groupRidesRowText, {marginTop: hp(0.5)}]}
              numberOfLines={2}>
              {item.group.description}
            </Text>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderUpcomingRidesItem = ({item, index}) => {
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
        {(item.group_ride_out_image && (
          <Image
            source={{
              uri: item.group_ride_out_image,
            }}
            style={styles.groupRidesAvatar}
          />
        )) || (
          <DefaultProfileImage
            name={item?.group?.short_name}
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
              <Text style={[styles.whiteText, isToday || {color: color.sky}]}>
                {isToday
                  ? 'Starts Today'
                  : moment(item.start_time, 'YYYY-MM-DD').fromNow(true) +
                    ' to start'}
                {/*Days to Calculate*/}
              </Text>
            </View>
          </View>
          {item.distance && item.distance !== '' && (
            <Text style={[styles.groupRidesRowText, {marginTop: hp(0.5)}]}>
              {item.distance}
            </Text>
          )}
          {item?.group?.total_participants && (
            <Text style={styles.groupRidesRowText}>
              {item.group.total_participants + ' participants'}
            </Text>
          )}
          {item?.sponsore_name && item.sponsore_name !== '' ? (
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
    <ScrollView style={{flex: 1}}>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Weather />
          <View style={styles.scrollBox}>
            <RepairShops navigation={navigation} />
          </View>
          <View style={styles.scrollBox}>
            <Activity navigation={navigation} />
          </View>
          <View style={styles.scrollBox}>
            <Navigation navigation={navigation} />
          </View>
          <View style={styles.scrollBox}>
            <Ranking navigation={navigation} />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          ...styles.newTabBotttom,
          backgroundColor: color.white,
          paddingVertical: hp(2),
          marginVertical: hp(2),
          borderRadius: wp(4),
        }}>
        <Image
          source={silver_coin}
          style={{
            height: hp(10),
            width: hp(10),
            marginTop: hp(-7),
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            ...styles.blackText,
            fontSize: normalize(12),
            marginTop: hp(1),
            alignSelf: 'center',
          }}>
          <Text style={{fontFamily: fonts.Lato_Regular}}>Current Tier:</Text>{' '}
          Silver
        </Text>
        <View
          style={{
            marginVertical: hp(1),
            overflow: 'hidden',
            borderRadius: wp(2),
            height: hp(1),
            width: wp(80),
            backgroundColor: color.light_gray_backgraound,
            alignSelf: 'center',
          }}>
          <View style={{flex: 1, width: '50%', backgroundColor: color.pink}} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(0.5),
            marginHorizontal: wp(8),
          }}>
          <Text
            style={{
              ...styles.blackText,
              color: color.profileImageGray,
              fontSize: normalize(12),
            }}>
            This week:{' '}
            <Text style={{fontFamily: fonts.Lato_Regular}}>15 miles</Text>
          </Text>
          <Text
            style={{
              ...styles.blackText,
              fontSize: normalize(12),
            }}>
            30 miles/60 miles
          </Text>
        </View>
      </View>
      <View style={styles.newTabBotttom}>
        <FlatList
          data={groupList.slice(0, 4)}
          renderItem={renderGroupRidesItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupRide');
              }}>
              <Text style={styles.blackText}>Group Rides</Text>
            </TouchableOpacity>
          }
          ListHeaderComponentStyle={styles.groupRidesHeader}
        />
      </View>
      <View style={[styles.newTabBotttom, {marginTop: hp(3)}]}>
        <FlatList
          data={rideOutList.slice(0, 4)}
          renderItem={renderUpcomingRidesItem}
          contentContainerStyle={{paddingBottom: hp(10)}}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupRide', {initialTab: 1});
              }}>
              <Text style={styles.blackText}>Upcoming Ride Outs</Text>
            </TouchableOpacity>
          }
          ListHeaderComponentStyle={styles.groupRidesHeader}
        />
      </View>
    </ScrollView>
  );
};
