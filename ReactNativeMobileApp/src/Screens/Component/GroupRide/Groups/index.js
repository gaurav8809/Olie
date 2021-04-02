import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import styles from './styles';
// import {favouriteGroups, GroupList} from './data';
import {color, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {CustomInputText, DefaultProfileImage} from '../../../Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fetchGroupsSocket,
  joinGroupSocket,
  loadGroupsSocket,
  unreadMessageCountSocket,
} from '../../../../Socket';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {escapeRegExp} from '../../../../Helper/validation';
import {FetchGroups} from '../../../../Redux/Actions/GroupsAction';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Groups = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  let authToken = useSelector((state) => state.user.authToken);
  let groupList = useSelector((state) => state.groups.groupList);

  const [groupArr, setGroupArr] = useState([...groupList]);
  const [groupListArr, setGroupListArr] = useState([...groupList]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(FetchGroups());

    fetchGroupsSocket({auth_token: authToken, is_ride_out: false});

    loadGroupsSocket((data) => {
      setGroupArr([...(data?.groups ?? [])]);
    });

    unreadMessageCountSocket((data) => {
      _.map(groupArr, (x) => {
        if (x.group_id == data.group_id) {
          x.unread_message = data?.unread_message;
        }
      });
      setGroupArr([...groupArr]);
    });
  }, []);

  useEffect(() => {
    let data = _.sortBy(groupArr, (x) => new Date(x?.group?.display_time));
    setGroupListArr([...data.reverse()]);
  }, [groupArr]);

  useEffect(() => {
    setGroupArr([...groupList]);
  }, [groupList]);

  const renderFavouriteGroup = ({item, index}) => {
    let count = 0;
    if (item.group.total_participants > 4) {
      count = parseInt(item.group.total_participants) - 3;
    }

    return (
      <TouchableOpacity
        style={styles.favouriteContainer}
        onPress={() => goToGroupChat(item)}>
        {item?.group?.group_image === null ? (
          <DefaultProfileImage
            name={item?.group?.short_name}
            style={styles.profileImgMain}
            labelStyle={{fontSize: normalize(30)}}
          />
        ) : (
          <FastImage
            source={{
              uri:
                (typeof item?.user?.profile_image === 'object' &&
                  item?.group?.group_image?.uri) ||
                item?.group?.group_image,
              headers: {Authorization: authToken},
              priority: FastImage.priority.low,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.profileImgMain}
          />
        )}
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={[styles.blackBoldText, {flex: 1}]}>
            {item.group.group_name}
          </Text>
          <View style={{flexDirection: 'row', marginLeft: wp(2)}}>
            {item.group.total_participants > 0 ? (
              item.group.group_users[0].user.avtar === null ? (
                <DefaultProfileImage
                  name={item?.group.group_users[0].user.short_name}
                  style={[styles.profileImgSub, {backgroundColor: color.gray}]}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[0].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 6}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants === 2 ||
            item.group.total_participants > 2 ? (
              item.group.group_users[1].user.avtar === null ? (
                <DefaultProfileImage
                  style={[styles.profileImgSub, {backgroundColor: color.gray}]}
                  name={item.group.group_users[1].user.short_name}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[1].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 6}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants === 3 ||
            item.group.total_participants > 3 ? (
              item.group.group_users[2].user.avtar === null ? (
                <DefaultProfileImage
                  style={[styles.profileImgSub, {backgroundColor: color.gray}]}
                  name={item.group.group_users[2].user.short_name}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[2].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 6}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants > 3 && count > 0 ? (
              <View style={[styles.profileImgSub, {zIndex: 4}]}>
                <Text style={[styles.blackBoldText, {color: color.white}]}>
                  {'+' + count}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const goToGroupChat = (item) => {
    _.map(groupArr, (x) => {
      if (x.group_id == item.group_id) {
        x.unread_message = 0;
      }
    });
    setGroupArr([...groupArr]);
    navigation.navigate('GroupChat', {data: item});
  };

  const renderGroups = ({item, index}) => {
    let count = 0;
    if (item.group.total_participants > 4) {
      //   count = parseInt(item.group.total_participants) - 1;
      // } else if (item.group.total_participants < 5) {
      //   count = parseInt(item.group.total_participants) - 2;
      // } else {
      count = parseInt(item.group.total_participants) - 3;
    }
    return (
      <TouchableOpacity
        style={[styles.favouriteContainer, styles.groupContainer]}
        onPress={() => goToGroupChat(item)}>
        {item?.group?.group_image === null ? (
          <DefaultProfileImage
            name={item?.group?.short_name}
            style={styles.profileImgMain}
            labelStyle={{fontSize: normalize(20)}}
          />
        ) : (
          <FastImage
            source={{
              uri:
                (typeof item?.user?.profile_image === 'object' &&
                  item?.group?.group_image?.uri) ||
                item?.group?.group_image,
              headers: {Authorization: authToken},
              priority: FastImage.priority.low,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.profileImgMain}
          />
        )}
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text
            style={[styles.blackText, {marginVertical: hp(0.5)}]}
            numberOfLines={2}>
            {item.group.group_name}
          </Text>
          {item.group.description && item.group.description !== '' ? (
            <Text
              style={[styles.grayText, {marginVertical: hp(0.5)}]}
              numberOfLines={2}>
              {item.group.description}
            </Text>
          ) : (
            <View />
          )}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: wp(2),
              marginVertical: hp(0.5),
            }}>
            {item.group.total_participants > 0 ? (
              item.group.group_users[0].user.avtar === null ? (
                <DefaultProfileImage
                  name={item?.group.group_users[0].user.short_name}
                  style={[styles.profileImgSub, {zIndex: 10}]}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[0].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 10}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants === 2 ||
            item.group.total_participants > 2 ? (
              item.group.group_users[1].user.avtar === null ? (
                <DefaultProfileImage
                  style={[styles.profileImgSub, {zIndex: 8}]}
                  name={item.group.group_users[1].user.short_name}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[1].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 8}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants === 3 ||
            item.group.total_participants > 3 ? (
              item.group.group_users[2].user.avtar === null ? (
                <DefaultProfileImage
                  style={[styles.profileImgSub, {zIndex: 6}]}
                  name={item.group.group_users[2].user.short_name}
                  labelStyle={{fontSize: normalize(15)}}
                />
              ) : (
                <FastImage
                  source={{
                    uri: item.group.group_users[2].user.avtar,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[styles.profileImgSub, {zIndex: 6}]}
                />
              )
            ) : (
              <View />
            )}
            {item.group.total_participants > 3 && count > 0 ? (
              <View
                style={[
                  styles.profileImgSub,
                  {zIndex: 4, backgroundColor: color.sky},
                ]}>
                <Text style={[styles.blackBoldText, {color: color.white}]}>
                  {'+' + count}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Text style={[styles.blackText, {flex: 1, fontSize: normalize(12)}]}>
            {moment(item?.group?.display_time).format(
              moment(item?.group?.display_time, 'YYYY-MM-DD').isSame(
                moment(),
                'D',
              )
                ? 'HH:mm'
                : 'DD/MM/YYYY HH:mm',
            )}
          </Text>
          {item.unread_message == 0 || (
            <View
              style={[styles.profileImgSub, {backgroundColor: color.darkPink}]}>
              <Text style={[styles.blackBoldText, {color: color.white}]}>
                {item.unread_message}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const onSearchGroup = (text) => {
    const compare = (a, searchTxt) => {
      return a
        .toLowerCase()
        .toString()
        .match(searchTxt.toLowerCase().toString());
    };

    setSearchText(text);
    let searchTxt = escapeRegExp(text);
    if (searchTxt !== '') {
      let answer = groupArr?.filter((a) =>
        compare(a?.group?.group_name, searchTxt),
      );
      setSearchData(answer);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{marginHorizontal: wp(6), marginVertical: hp(2)}}>
          <CustomInputText
            containerStyle={{backgroundColor: color.light_background}}
            placeholderColor={color.gray}
            placeholder={'Search for a group'}
            value={searchText}
            onChangeText={(text) => onSearchGroup(text)}
            leftComponent={
              <Ionicons name={'search'} color={color.gray} size={hp(2.5)} />
            }
          />
        </View>
        {/*   {groupArr.length > 0 && (
          <View style={styles.favouriteFlatlist}>
            <Text style={[styles.headingText, styles.favouriteHeading]}>
              Favorite groups
            </Text>

            <FlatList
              data={[...groupArr].reverse()}
              renderItem={renderFavouriteGroup}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{paddingBottom: hp(2), paddingHorizontal: wp(3)}}
            />
          </View>
        )}*/}
        <FlatList
          data={searchText === '' ? groupListArr : searchData}
          renderItem={renderGroups}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: hp(2)}}
        />
      </View>
    </ScrollView>
  );
};
