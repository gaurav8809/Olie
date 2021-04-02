import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, fonts, hp, isANDROID, wp} from '../../../Helper/themeHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, View, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SendLocationModal} from './SendLocationModal';
import DocumentPicker from 'react-native-document-picker';
import {ContactsList} from './ContactsList';
import Contacts from 'react-native-contacts';
import _ from 'lodash';
import {escapeRegExp} from '../../../Helper/validation';
import {requestContactAndroidPermission} from '../../../Helper/permissionAndroid';
import {ActionSheet} from '../../Common';
import {openImagePicker} from '../../../Helper/imageUpload';
import {UploadFileInChat} from '../../../Redux/Actions/GroupsAction';
import {useDispatch} from 'react-redux';
import {FindFriendsAction} from '../../../Redux/Actions/FriendsAction';
import {plus_icon} from '../../Assets';
import {FindFriendModal} from '../Home/FindFriendsTab/FindFriendModal';
const PhoneNumber = require('awesome-phonenumber');

export const CustomAction = (props) => {
  const {onSend = null} = props;
  const [deviceContact, setDeviceContact] = useState([]);
  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => setActionSheet(false);
  const [viewLocationDetail, setViewLocationDetail] = useState(false);
  const [viewConatctsDetail, setViewContactsDetail] = useState(false);
  const [contactList, setContactList] = useState([{title: '', data: []}]);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const getPermissionRecord = () => {
    Contacts.iosEnableNotesUsage(false);
    if (isANDROID) {
      requestContactAndroidPermission().then((res) => {
        if (res !== undefined && res !== 'denied' && res !== 1) {
          getContactsFromDevice();
        }
      });
    } else {
      getContactsFromDevice();
    }
  };

  const getContactsFromDevice = () => {
    let contactArray = [];
    let emailArray = [];
    Contacts.getAll().then(async (contacts) => {
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

  const shareContactData = async () => {
    getPermissionRecord();
  };
  const onChangeText = (text) => {
    setSearchText(text);
    let searchTxt = escapeRegExp(text);
    let list = contactList;
    let obj = [];
    if (searchTxt !== '') {
      list &&
        list.map((item) => {
          let answer = item?.data?.filter((a) => compare(a, searchTxt));
          if (answer.length > 0) {
            obj.push({
              title: item.title,
              data: answer,
            });
          }
        });
      setContactList(obj);
    } else {
      setContactList(list);
    }
  };
  const compare = (a, searchTxt) => {
    return (a.givenName + ' ' + a.familyName)
      .toLowerCase()
      .toString()
      .match(searchTxt.toLowerCase().toString());
  };

  const actionsList = [
    {
      label: 'Document',
      labelStyle: {
        color: color.white,
      },
      leftComponent: (
        <Ionicons
          name={'document-outline'}
          size={hp(3)}
          color={color.sky}
          style={{marginRight: wp(2)}}
        />
      ),
      onPress: () => {
        closeActionSheet();
        DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        }).then((doc) => {
          let payload = {
            name: doc.name,
            type: doc.type,
            uri: isANDROID ? doc.uri : doc.uri.replace('file://', ''),
          };

          dispatch(UploadFileInChat({message_file: payload})).then((res) => {
            onSend({
              message_file: res[0].url,
              message_file_type: 'document',
              message_file_metadata: res[0],
            });
          });
        });
      },
    },
    {
      label: 'Photo & Video Library',
      labelStyle: {
        color: color.white,
      },
      leftComponent: (
        <FontAwesome
          name={'photo'}
          size={hp(3)}
          color={color.sky}
          style={{marginRight: wp(2)}}
        />
      ),
      onPress: () => {
        openImagePicker({
          mediaType: 'any',
          multiple: true,
          cropping: false,
        }).then((images) => {
          closeActionSheet();
          _.map(images, (image) => {
            dispatch(UploadFileInChat({message_file: image})).then((res) => {
              onSend({
                message_file: res[0].url,
                message_file_metadata: image.type.includes('video')
                  ? {...res[0], isPlaying: false}
                  : res[0],
                message_file_type: image.type.includes('video')
                  ? 'video'
                  : 'image',
              });
            });
          });
        });
      },
    },
    {
      label: 'Location',
      labelStyle: {
        color: color.white,
      },
      leftComponent: (
        <Ionicons
          name={'location-outline'}
          size={hp(3)}
          color={color.sky}
          style={{marginRight: wp(2)}}
        />
      ),
      onPress: () => {
        {
          closeActionSheet();
          // renderMessageLocation()
          setViewLocationDetail(true);
        }
      },
    },
    {
      label: 'Share Contact',
      labelStyle: {
        color: color.white,
      },
      leftComponent: (
        <FontAwesome
          name={'user-circle-o'}
          size={hp(3)}
          color={color.sky}
          style={{marginRight: wp(2)}}
        />
      ),
      onPress: () => {
        closeActionSheet();
        shareContactData().then(() => {});
        setViewContactsDetail(true);
      },
    },
  ];

  return (
    <View>
      <TouchableOpacity onPress={() => setActionSheet(true)}>
        <Image
          source={plus_icon}
          style={{marginHorizontal: wp(2), width: wp(7), height: wp(7)}}
        />
        {/*<Entypo name={'plus'} size={wp(10)} color={color.sky} />*/}
      </TouchableOpacity>
      <ActionSheet
        containerStyle={{paddingBottom: hp(0)}}
        data={actionsList}
        rowStyle={{justifyContent: 'flex-start'}}
        visible={actionSheet}
        setActionSheet={closeActionSheet}
      />
      {viewLocationDetail && (
        <SendLocationModal
          onSend={onSend}
          onClose={() => setViewLocationDetail(false)}
        />
      )}
      {viewConatctsDetail && (
        <ContactsList
          fetchFindFriends={() => {
            fetchFindFriends();
          }}
          title={'Contacts'}
          onSend={onSend}
          searchText={searchText}
          onChangeText={onChangeText}
          onClose={() => setViewContactsDetail(false)}
        />
      )}
    </View>
  );
};
