import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import styles from './GroupPopUpStyles';
import {
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../Helper/appHelper';

import {color, wp, normalize, hp} from '../../Helper/themeHelper';
import {CustomInputText, DefaultProfileImage} from '../Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {escapeRegExp} from '../../Helper/validation';
import _ from 'lodash';
// import {FetchFriends} from '../../../../Redux/Actions/FriendsAction';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import findFriendStyle from '../Component/Home/FindFriendsTab/styles';
import {olie_sky_logo} from '../Assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {setRideStatus} from '../../Redux/Actions/NavigationAction';
import {
  joinGroupRideSocket,
  newUserJoinRideSocket,
  sendLiveLocationSocket,
} from '../../Socket';
import Geolocation from '@react-native-community/geolocation';
export const GroupRidePopup = (props) => {
  const {navigation} = props;
  const {onClose = null, fetchFindFriends = null} = props;
  const groupList = useSelector((state) => state?.groups?.groupList);
  const [initialRegion, setInitialRegion] = useState(INITIAL_REGION);
  const insets = useSafeAreaInsets();
  // const friendsList = useSelector((state) => state?.friends?.findFriendsList);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [searchList, setSearchedList] = useState([{title: '', data: []}]);
  const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';
  let authToken = useSelector((state) => state.user.authToken);
  const renderItem = ({item, index}) => {
    const {hasThumbnail, thumbnailPath, displayName, is_olie_user} = item;
    const isChecked = selectedContacts.includes(item);
    return (
      <TouchableOpacity
        style={[styles.favouriteContainer, styles.groupContainer]}
        onPress={() => toggleSelection(isChecked, item)}>
        {item?.group?.group_image === null ? (
          <DefaultProfileImage
            name={item?.group?.short_name}
            style={styles.profileImgMain}
            labelStyle={{fontSize: normalize(20)}}
          />
        ) : (
          <FastImage
            source={{
              uri: item?.group?.group_image,
              headers: {Authorization: authToken},
              priority: FastImage.priority.low,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.profileImgMain}
          />
        )}
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={[styles.blackText, {marginVertical: hp(0.5)}]}>
            {item.group.group_name}
          </Text>
          {item.group.description && item.group.description !== '' ? (
            <Text style={[styles.grayText, {marginVertical: hp(0.5)}]}>
              {item.group.description}
            </Text>
          ) : (
            <View />
          )}
        </View>
        <View onPress={() => {}} style={{marginHorizontal: wp(2)}}>
          {isChecked ? (
            <AntDesign name={'checkcircle'} color={color.sky} size={wp(5)} />
          ) : (
            <Entypo name={'circle'} color={color.gray} size={wp(5)} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => (
    <Text style={findFriendStyle.sectionHeader}>{section.title}</Text>
  );

  const toggleSelection = (isChecked, selectData) => {
    let data = selectedContacts;
    data.length > 0 && data.pop();
    data.push(selectData);

    // if (isChecked) {
    //   _.remove(data, (x) => x === contact);
    // } else {
    //   data.push(contact);
    // }
    setSelectedContacts([...data]);
  };

  const onChangeText = (text) => {
    const compare = (a, searchTxt) => {
      return a?.group?.group_name
        .toLowerCase()
        .toString()
        .match(searchTxt.toLowerCase().toString());
    };

    setSearchText(text);
    let searchTxt = escapeRegExp(text);
    let list = groupList;
    if (searchTxt !== '') {
      let answer = list?.filter((a) => compare(a, searchTxt));
      setSearchedList([...answer]);
    }
  };
  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      try {
        Geolocation.getCurrentPosition((info) => {
          const initRoute = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          // await setInitialRegion(initRoute);
          resolve(initRoute);
        });
      } catch (e) {
        resolve(false);
      }
    });
  };

  return (
    <Modal style={{flex: 1}} animationType={'slide'}>
      <View
        style={[
          styles.contactContainer,
          {paddingTop: insets.top > 0 ? insets.top : hp(1)},
        ]}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => onClose && onClose()}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>{props.title}</Text>
          <TouchableOpacity
            disabled={selectedContacts.length === 0}
            onPress={async () => {
              onClose && onClose();
              getCurrentLocation().then(async (res) => {
                if (res) {
                  await joinGroupRideSocket({
                    auth_token: authToken,
                    group_id: selectedContacts[0].group_id,
                  });

                  await newUserJoinRideSocket({
                    auth_token: authToken,
                    group_id: selectedContacts[0].group_id,
                    location_data: res,
                  });
                  await sendLiveLocationSocket({
                    auth_token: authToken,
                    group_id: selectedContacts[0].group_id,
                    location_data: res,
                  });
                  dispatch(setRideStatus(0));
                  navigation.navigate('StartingRideScreen', {
                    screen: 'GroupRide',
                    groupData: selectedContacts,
                  });
                  // dispatch(setRideStatus(0));
                }
              });
            }}>
            <Text
              style={[
                styles.sideTextStyle,
                {
                  color: selectedContacts.length === 0 ? color.gray : color.sky,
                },
              ]}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: hp(2)}}>
          <CustomInputText
            value={searchText}
            onChangeText={(text) => onChangeText && onChangeText(text)}
            leftComponent={
              <AntDesign name={'search1'} size={wp(4)} color={color.gray} />
            }
            containerStyle={styles.contactInputContainer}
            inputStyle={styles.contactInputStyle}
            placeholderColor={color.gray}
            placeholder={'Search'}
            clearButtonMode={'while-editing'}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={searchText === '' ? groupList : searchList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: hp(2)}}
        />
      </View>
    </Modal>
  );
};
