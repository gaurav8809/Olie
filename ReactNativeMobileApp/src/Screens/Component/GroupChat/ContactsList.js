import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  Image,
} from 'react-native';
import _ from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, hp, normalize, wp} from '../../../Helper/themeHelper';
import styles from './styles';
import findFriendStyle from '../Home/FindFriendsTab/styles';
import {CustomInputText, DefaultProfileImage} from '../../Common';
import {olie_sky_logo} from '../../Assets';
import {escapeRegExp} from '../../../Helper/validation';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

export const ContactsList = (props) => {
  const {onClose = null, onSend = null, fetchFindFriends = null} = props;
  const friendsList = useSelector((state) => state?.friends?.findFriendsList);

  const insets = useSafeAreaInsets();
  // const friendsList = useSelector((state) => state?.friends?.findFriendsList);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchedList] = useState([{title: '', data: []}]);
  const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';
  let authToken = useSelector((state) => state.user.authToken);
  const renderItem = ({item, index}) => {
    const {hasThumbnail, thumbnailPath, displayName, is_olie_user} = item;
    const isChecked = selectedContacts.includes(item);
    return (
      <TouchableOpacity style={findFriendStyle.rowStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={findFriendStyle.imageRowStyle}>
            {(thumbnailPath && thumbnailPath === '') || !hasThumbnail ? (
              <DefaultProfileImage name={item?.short_name} style={{flex: 1}} />
            ) : (
              <FastImage
                source={thumbnailPath}
                resizeMode={FastImage.resizeMode.contain}
                style={{flex: 1}}
              />
            )}
          </View>

          <Text style={findFriendStyle.item}>{displayName}</Text>
        </View>

        <View style={findFriendStyle.logoInRow}>
          <Image
            source={olie_sky_logo}
            style={{height: wp(7), width: wp(7), opacity: is_olie_user ? 1 : 0}}
            resizeMode={'contain'}
          />
          <TouchableOpacity
            onPress={() => toggleSelection(isChecked, item)}
            style={{marginHorizontal: wp(2)}}>
            {isChecked ? (
              <AntDesign name={'checkcircle'} color={color.sky} size={wp(5)} />
            ) : (
              <Entypo name={'circle'} color={color.gray} size={wp(5)} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => (
    <Text style={findFriendStyle.sectionHeader}>{section.title}</Text>
  );

  const toggleSelection = (isChecked, contact) => {
    let data = selectedContacts;
    if (isChecked) {
      _.remove(data, (x) => x === contact);
    } else {
      data.push(contact);
    }
    setSelectedContacts([...data]);
  };

  const onChangeText = (text) => {
    const compare = (a, searchTxt) => {
      return a.displayName
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
            onPress={() => {
              selectedContacts.map((data) => {
                if (data.displayName !== '') {
                  onSend({
                    message_file: data,
                    message_file_type: 'contact',
                  });
                }
              });
              onClose && onClose();
            }}>
            <Text
              style={[
                styles.sideTextStyle,
                {
                  color: selectedContacts.length === 0 ? color.gray : color.sky,
                },
              ]}>
              Share
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
        <SectionList
          sections={searchText !== '' ? searchList : friendsList}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
        />
      </View>
    </Modal>
  );
};
