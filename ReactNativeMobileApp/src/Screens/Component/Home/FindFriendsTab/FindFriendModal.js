import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  FlatList,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import styles from './styles';
import {CustomInputText, DefaultProfileImage} from '../../../Common';
import {olie_sky_logo} from '../../../Assets';
import {escapeRegExp} from '../../../../Helper/validation';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {AddFriendsAction} from '../../../../Redux/Actions/FriendsAction';

export const FindFriendModal = (props) => {
  const {onClose = null, fetchFindFriends = null} = props;
  const friendsList = useSelector((state) => state?.friends?.findFriendsList);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedContactsData, setSelectedContactsData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchedList] = useState([{title: '', data: []}]);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let data = [];
    _.map(friendsList, (i) =>
      _.find(i.data, (x) => {
        if (selectedContacts.includes(x?.user_id)) {
          data.push(x);
        }
      }),
    );
    setSelectedContactsData([...data]);
  }, [selectedContacts]);

  const renderItem = ({item}) => {
    const {
      hasThumbnail,
      thumbnailPath,
      displayName,
      is_olie_user,
      is_friend = null,
    } = item;
    const isChecked = selectedContacts.includes(item?.user_id);
    return (
      <TouchableOpacity style={styles.rowStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.imageRowStyle}>
            {item?.hasThumbnail && item?.thumbnailPath !== '' ? (
              <Image
                source={{
                  uri: item?.thumbnailPath,
                }}
                style={styles.selectedContactImage}
              />
            ) : (
              <DefaultProfileImage
                name={item?.short_name}
                style={styles.selectedContactImage}
              />
            )}
          </View>

          <Text style={styles.item}>{displayName}</Text>
        </View>
        {is_olie_user && (
          <View style={styles.logoInRow}>
            <Image
              source={olie_sky_logo}
              style={{height: wp(7), width: wp(7)}}
              resizeMode={'contain'}
            />
            <TouchableOpacity
              disabled={is_friend}
              onPress={() => toggleSelection(isChecked, item?.user_id)}
              style={{marginHorizontal: wp(2), opacity: is_friend ? 0 : 1}}>
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
    const {hasThumbnail, thumbnailPath, displayName, user_id} = item;
    return (
      <View style={styles.selectedContactInnerView}>
        <View>
          {item?.hasThumbnail && item?.thumbnailPath !== '' ? (
            <Image
              source={{
                uri: item?.thumbnailPath,
              }}
              style={styles.selectedContactImage}
            />
          ) : (
            <DefaultProfileImage
              name={item?.short_name}
              style={styles.selectedContactImage}
            />
          )}
          <TouchableOpacity
            style={styles.selectedContactButtonView}
            onPress={() => toggleSelection(true, user_id)}>
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

  const addFriends = () => {
    dispatch(
      AddFriendsAction({friends_id: selectedContacts}, selectedContactsData),
    ).then(() => {
      fetchFindFriends();
      onClose();
    });
  };

  return (
    <Modal style={{flex: 1}} animationType={'slide'}>
      <View
        style={[
          styles.container,
          {paddingTop: insets.top > 0 ? insets.top : hp(1)},
        ]}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>Find Friends</Text>
          <TouchableOpacity
            onPress={addFriends}
            disabled={selectedContacts.length === 0}>
            <Text
              style={[
                styles.sideTextStyle,
                selectedContacts.length === 0 && {color: color.gray},
              ]}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: hp(2)}}>
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
      </View>
      {selectedContacts.length > 0 && (
        <View style={styles.selectedContactMainView}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={selectedContactsData || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSelectedContactList}
            extraData={selectedContactsData}
          />
        </View>
      )}
      <View style={{flex: 1}}>
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
    </Modal>
  );
};
