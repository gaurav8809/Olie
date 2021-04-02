import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SectionList,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../Home/FindFriendsTab/styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import {escapeRegExp} from '../../../../Helper/validation';
import {
  AppInfoHeader,
  CustomInputText,
  DefaultProfileImage,
} from '../../../Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FetchFriends} from '../../../../Redux/Actions/FriendsAction';
import FastImage from 'react-native-fast-image';

export const AddParticipants = (props) => {
  const {
    onNext = null,
    onCancel = null,
    participants = [],
    rightComponentName = '',
    fromGroupInfo = false,
    addedUsers = [],
    hideCheckBox = false,
    headerText = null,
  } = props;
  let exceptedContact = [];
  if (fromGroupInfo) {
    for (let i = 0; i < addedUsers.length; i++) {
      exceptedContact[i] = addedUsers[i].user_id;
    }
  }
  const dispatch = useDispatch();
  const friendsList = useSelector((state) => state?.friends?.olieFriends);
  const [selectedContacts, setSelectedContacts] = useState(participants);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchedList] = useState([{title: '', data: []}]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [selectedContactsData, setSelectedContactsData] = useState([]);
  let authToken = useSelector((state) => state.user.authToken);
  const [popupVisible, setPopupVisible] = useState(false);
  const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  useEffect(() => {
    let data = [];
    _.map(friendsList, (i) =>
      _.find(i.data, (x) => {
        if (selectedContacts.includes(x?.friend_user_id)) {
          data.push(x);
        }
      }),
    );
    setSelectedContactsData([...data]);
  }, [selectedContacts]);

  const renderItem = ({item, index}) => {
    const {user = null, friend_user_id} = item;
    const isChecked = selectedContacts.includes(friend_user_id);
    let isAvailable;
    if (fromGroupInfo) {
      isAvailable = exceptedContact.includes(friend_user_id);
    }
    return (
      <TouchableOpacity style={styles.rowStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.imageRowStyle}>
            {item?.user?.profile_image === DEFAULT_PROFILE_PIC ||
            item?.user?.profile_image === null ? (
              <DefaultProfileImage
                name={item?.user?.short_name}
                style={styles.selectedContactImage}
                labelStyle={{fontSize: normalize(30)}}
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

          <Text style={styles.item}>{user?.user_name}</Text>
        </View>
        {!isAvailable && !hideCheckBox && (
          <View style={styles.logoInRow}>
            <TouchableOpacity
              onPress={() => toggleSelection(isChecked, friend_user_id)}
              style={{marginHorizontal: wp(2)}}>
              {isChecked ? (
                <AntDesign
                  name={'checkcircle'}
                  color={color.sky}
                  size={wp(5)}
                />
              ) : (
                <Entypo name={'circle'} color={color.gray} size={wp(5)} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSelectedContactList = ({item}) => {
    const {user = null, friend_user_id} = item;
    return (
      <View style={styles.selectedContactInnerView}>
        <View>
          {user?.profile_image ? (
            <Image
              style={styles.selectedContactImage}
              source={{
                uri: user?.profile_image,
              }}
            />
          ) : (
            <DefaultProfileImage
              name={user?.short_name}
              style={styles.selectedContactImage}
            />
          )}
          <TouchableOpacity
            style={styles.selectedContactButtonView}
            onPress={() => toggleSelection(true, friend_user_id)}>
            <Ionicons name={'close'} color={color.white} size={wp(4)} />
          </TouchableOpacity>
        </View>
        {/*<Text>{displayName}</Text>*/}
      </View>
    );
  };

  const renderSectionHeader = ({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const toggleSelection = (isChecked, contact) => {
    let data = selectedContacts;
    if (isChecked) {
      _.remove(data, (x) => x === contact);
      if (data.length >= 4) {
        setTotalAmount(totalAmount - 0.99);
      }
    } else {
      if (data.length >= 4) {
        setTotalAmount((data.length - 3) * 0.99);
      }
      data.push(contact);
    }
    setSelectedContacts([...data]);
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
    let obj = [];
    if (searchTxt !== '') {
      list?.map((item) => {
        let answer = item?.data?.filter((a) => compare(a, searchTxt));
        if (answer.length > 0) {
          obj.push({
            title: item.title,
            data: answer,
          });
        }
      });
      setSearchedList(obj);
    }
  };

  return (
    <View style={{flex: 1}}>
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              exceptedContact.splice(0, exceptedContact.length);
              onCancel();
            }}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        headerText={headerText || 'Group Ride'}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              if (selectedContacts.length >= 4) {
                setPopupVisible(true);
              } else {
                onNext(selectedContacts);
              }
            }}
            disabled={selectedContacts.length === 0}>
            <Text
              style={[
                styles.sideTextStyle,
                selectedContacts.length === 0 && {color: color.gray},
              ]}>
              {rightComponentName}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.counterContainer}>
        <View style={styles.participantCounter}>
          <Text style={styles.countersubText}>N Participant</Text>
          <Text style={styles.counterMainText}>{selectedContacts.length}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.countersubText}>Total Price</Text>
          <Text style={styles.counterMainText}>
            {totalAmount.toFixed(2)} {'£'}
          </Text>
        </View>
      </View>
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
        <SectionList
          sections={searchText !== '' ? searchList : friendsList}
          contentContainerStyle={{paddingBottom: hp(2)}}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
        />
      </View>
      <Modal transparent={true} visible={popupVisible}>
        <View
          style={{
            backgroundColor: '#FFFFFFaa',
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: color.black_33,
              marginHorizontal: wp(6.4),
              paddingVertical: hp(4),
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.selectedCloseButtonView}
              onPress={() => setPopupVisible(false)}>
              <Ionicons name={'close'} color={color.darkgray} size={wp(4)} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: normalize(40),
                  fontFamily: fonts.Lato_Regular,
                  color: color.white,
                }}>
                Purchase More
              </Text>
              <Text
                style={{
                  fontSize: normalize(40),
                  fontFamily: fonts.Lato_Regular,
                  color: color.white,
                }}>
                Participant
              </Text>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Regular,
                  color: color.sky,
                  marginTop: hp(1),
                }}>
                {'Buy'} {selectedContacts.length - 4} {'more participants'}
              </Text>
              <Text
                style={{
                  fontSize: normalize(10),
                  fontFamily: fonts.Lato_Regular,
                  color: color.white,
                  marginTop: hp(1),
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: normalize(24),
                  fontFamily: fonts.Lato_Bold,
                  color: color.white,
                }}>
                £{totalAmount}
              </Text>
            </View>
            <View
              style={{
                marginTop: hp(3),
                height: hp(5),
                width: wp(57),
                backgroundColor: color.sky,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                shadowOpacity: 0.6,
                shadowColor: color.black,
                shadowRadius: 6,
                shadowOffset: {height: 5, width: 0},
                elevation: 2,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontSize: normalize(14),
                  fontFamily: fonts.Lato_Bold,
                }}>
                Purchase Participants
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
