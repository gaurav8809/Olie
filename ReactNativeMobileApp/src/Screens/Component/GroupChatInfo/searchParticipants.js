import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import styles from '../Home/FindFriendsTab/styles';
import {color, hp, normalize, wp} from '../../../Helper/themeHelper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {escapeRegExp} from '../../../Helper/validation';
import {
  AppInfoHeader,
  CustomInputText,
  DefaultProfileImage,
} from '../../Common';
import FastImage from 'react-native-fast-image';

export const SearchParticipants = (props) => {
  const {
    onCancel = null,
    fromGroupInfo = false,
    addedUsers = [],
    headerText = null,
    listData = [],
    navigation = null,
  } = props;
  let exceptedContact = [];
  if (fromGroupInfo) {
    for (let i = 0; i < addedUsers.length; i++) {
      exceptedContact[i] = addedUsers[i].user_id;
    }
  }
  const friendsList = listData;
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchedList] = useState([{title: '', data: []}]);
  let authToken = useSelector((state) => state.user.authToken);
  const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';
  const userDetail = useSelector((state) => state?.user.userDetail);

  const renderItem = ({item, index}) => {
    const {user = null} = item;
    let username =
      userDetail.user_id === item.user.user_id ? 'You' : item?.user?.user_name;
    return (
      <TouchableOpacity
        style={styles.rowStyle}
        disabled={userDetail.user_id === item.user.user_id}
        onPress={() => {
          onCancel();
          setTimeout(() => {
            navigation.navigate('ContactInfo', {
              data: {
                name: item?.user?.user_name,
                profileUri: item?.user?.profile_image ?? null,
                short_name: item?.user?.short_name ?? '',
                ...item?.user,
              },
            });
          }, 100);
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.imageRowStyle}>
            {item?.user?.profile_image === DEFAULT_PROFILE_PIC ||
            item?.user?.profile_image === null ? (
              <DefaultProfileImage
                name={item?.user?.short_name}
                style={{flex: 1}}
              />
            ) : typeof item?.user?.profile_image === 'object' &&
              item?.user?.profile_image?.uri ? (
              <Image
                source={{uri: item?.user?.profile_image.uri}}
                resizeMode={'contain'}
                style={{flex: 1}}
              />
            ) : (
              <FastImage
                source={{
                  uri:
                    (typeof item?.user?.profile_image === 'object' &&
                      item?.user?.profile_image?.uri) ||
                    item?.user?.profile_image,
                  headers: {Authorization: authToken},
                  priority: FastImage.priority.low,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{flex: 1}}
              />
            )}
          </View>

          <Text style={styles.item}>{username}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onChangeText = (text) => {
    const compare = (a, searchTxt) => {
      return a?.user?.user_name
        .toLowerCase()
        .toString()
        .match(searchTxt.toLowerCase().toString());
    };

    setSearchText(text);
    let searchTxt = escapeRegExp(text);
    let list = friendsList;
    if (searchTxt !== '') {
      let answer = list?.filter((a) => compare(a, searchTxt));
      setSearchedList([...answer]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              onCancel();
            }}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        headerText={headerText || 'Add Participants'}
      />
      <View style={[styles.container]}>
        <CustomInputText
          value={searchText}
          onChangeText={(text) => onChangeText(text)}
          leftComponent={
            <AntDesign name={'search1'} size={wp(4)} color={color.gray} />
          }
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholderColor={color.gray}
          placeholder={'Search'}
          clearButtonMode={'while-editing'}
        />
      </View>
      <View style={{flex: 1, backgroundColor: color.white}}>
        <FlatList
          data={searchText !== '' ? searchList : friendsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: hp(2)}}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
        />
      </View>
    </View>
  );
};
