import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import _ from 'lodash';
import {AppButton, DefaultProfileImage} from '../../../Common';
import {
  wp,
  hp,
  fonts,
  normalize,
  color,
  isANDROID,
} from '../../../../Helper/themeHelper';
import {FindFriendModal} from './FindFriendModal';
import styles from './styles';
import {
  requestContactAndroidPermission,
  settingPermission,
} from '../../../../Helper/permissionAndroid';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddFriendsAction,
  FindFriendsAction,
} from '../../../../Redux/Actions/FriendsAction';
const PhoneNumber = require('awesome-phonenumber');

export const FindFriends = (props) => {
  const dispatch = useDispatch();
  const olieContactList = useSelector(
    (state) => state?.friends?.olieContactList,
  );

  const friendsList = useSelector((state) => state?.friends?.findFriendsList);
  const [isFindFriendModal, setFindFriendModal] = useState(false);
  const [deviceContact, setDeviceContact] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  useEffect(() => {
    Contacts.iosEnableNotesUsage(false);
    // requestContactAndroidPermission().then((r) => {});
    getPermissionRecord();
  }, []);

  useEffect(() => {
    const suggestedFriendsList = _.filter(
      olieContactList ?? [],
      (x) =>
        x?.is_olie_user === true && (!x?.is_friend || x?.is_friend === false),
    );
    setSuggestedFriends([...suggestedFriendsList]);
  }, [olieContactList]);

  const getPermissionRecord = () => {
    const permissionManager = (permission) => {
      if (permission === 'undefined' || permission === 'denied') {
        settingPermission(
          'Can we access your Contacts?',
          'You cannot access contact list because You have denied contact permission!',
        );
      }
      if (permission === 'authorized') {
        getContactsFromDevice();
      }
    };
    if (isANDROID) {
      requestContactAndroidPermission().then((r) => {
        getContactsFromDevice();
      });
    } else {
      getContactsFromDevice();
    }
  };

  const getContactsFromDevice = () => {
    let contactArray = [];
    let emailArray = [];
    Contacts.getAll().then((contacts) => {
      const uniqData = _.uniq(contacts);
      _.map(uniqData, (x) => {
        let displayName = x.givenName;
        if (x?.middleName !== '') {
          displayName += ' ' + x.middleName;
        }
        if (x?.familyName !== '') {
          displayName += ' ' + x.familyName;
        }

        if (x.phoneNumbers.length === 0 && x.emailAddresses.length > 0) {
          emailArray.push({
            displayName: x?.displayName ?? displayName,
            emailAddresses: _.map(x.emailAddresses, 'email'),
            phoneNumber: null,
            thumbnailPath: x.thumbnailPath,
            hasThumbnail: x.hasThumbnail,
          });
        }
        _.map(x.phoneNumbers, (y) => {
          let phone = PhoneNumber(y.number, 'GB');
          phone = phone.getNumber('significant');
          contactArray.push({
            displayName: x?.displayName ?? displayName,
            emailAddresses: _.map(x.emailAddresses, 'email'),
            phoneNumber: phone,
            thumbnailPath: x.thumbnailPath,
            hasThumbnail: x.hasThumbnail,
          });
        });
      });
      const uniqContacts = _.uniqBy(contactArray, 'phoneNumber');
      const uniqEmails = _.uniqBy(emailArray, 'emailAddresses.email');
      setDeviceContact([...uniqContacts, ...uniqEmails]);
      fetchFindFriends([...uniqContacts, ...uniqEmails]);
    });
  };

  const fetchFindFriends = (contactNumbers = deviceContact) =>
    contactNumbers.length > 0 &&
    dispatch(FindFriendsAction({contact_numbers: contactNumbers}));

  const addFriend = (id) => {
    dispatch(AddFriendsAction({friends_id: [id]})).then((r) => {
      if (r) {
        _.map(suggestedFriends, (x) => {
          if (x?.user_id === id) {
            Object.assign(x, {is_friend: true});
          }
        });
        setSuggestedFriends([...suggestedFriends]);
      }
    });
  };

  const renderSuggestFriend = ({item, index}) => {
    return (
      <View style={styles.scrollBox}>
        {item?.hasThumbnail && item?.thumbnailPath !== '' ? (
          <Image
            source={{
              uri: item?.thumbnailPath,
            }}
            style={styles.suggestedFriendImage}
          />
        ) : (
          <DefaultProfileImage
            name={item?.short_name}
            style={styles.suggestedFriendImage}
          />
        )}
        <Text
          style={[
            styles.headerText,
            {marginVertical: hp(0), marginHorizontal: wp(2)},
          ]}
          numberOfLines={1}>
          {item?.displayName ?? ''}
        </Text>

        <AppButton
          disabled={!!item?.is_friend}
          label={item?.is_friend ? 'Added' : 'Add'}
          btnStyle={[
            styles.addButton,
            !!item?.is_friend && {backgroundColor: color.black_33},
          ]}
          onPress={() => addFriend(item.user_id)}
        />
      </View>
    );
  };

  const friendImages = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginVertical: hp(2.5),
        }}>
        <Image
          source={{uri: 'https://source.unsplash.com/user/erondu'}}
          style={styles.leftImage}
        />
        <Image
          source={{uri: 'https://source.unsplash.com/user/erondu'}}
          style={styles.centerImage}
        />
        <Image
          source={{uri: 'https://source.unsplash.com/user/erondu'}}
          style={styles.rightImage}
        />
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.indexContainer}>
        {friendImages()}
        <Text style={styles.headerText}> Grow your contacts list!</Text>

        <View style={styles.btnContainer}>
          <View style={{flex: 1, marginRight: wp(4)}}>
            <AppButton
              label={'Find Friends'}
              onPress={() => {
                if (friendsList.length > 0) {
                  setTimeout(() => {
                    setFindFriendModal(true);
                  }, 500);
                } else {
                  getPermissionRecord();
                }
              }}
              btnStyle={styles.addOrFindButton}
              labelStyle={{
                fontFamily: fonts.Lato_Bold,
                fontSize: normalize(15),
                fontWeight: '700',
              }}
            />
          </View>
          <View style={{flex: 1, marginLeft: wp(4)}}>
            <AppButton
              label={'Add Friends'}
              onPress={() => {
                props.navigation.navigate('AddFriend');
              }}
              btnStyle={styles.addOrFindButton}
              labelStyle={{
                fontFamily: fonts.Lato_Bold,
                fontSize: normalize(15),
                fontWeight: '700',
              }}
            />
          </View>
        </View>
      </View>

      {suggestedFriends && suggestedFriends.length > 0 && (
        <Text style={[styles.textBold, {fontFamily: fonts.Lato_Regular}]}>
          Suggested Friends
        </Text>
      )}

      <View style={{flex: 1}}>
        <FlatList
          data={suggestedFriends}
          renderItem={renderSuggestFriend}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {isFindFriendModal && (
        <FindFriendModal
          onClose={() => {
            setFindFriendModal(false);
          }}
          fetchFindFriends={() => {
            fetchFindFriends();
          }}
        />
      )}
    </ScrollView>
  );
};
