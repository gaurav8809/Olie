import React, {useEffect, useState} from 'react';
import {View, Text, SectionList, Image} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color, wp, normalize} from '../../../../Helper/themeHelper';
import {CustomInputText, DefaultProfileImage} from '../../../Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {escapeRegExp} from '../../../../Helper/validation';
import _ from 'lodash';
import {FetchFriends} from '../../../../Redux/Actions/FriendsAction';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

export const GroupContacts = (props) => {
  const {navigation} = props;
  const [searchText, setSearchText] = useState('');
  const contactsArray = useSelector((state) => state.friends.olieFriends);
  const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';
  const [searchedArray, setSearchedArray] = useState(contactsArray || []);
  let authToken = useSelector((state) => state.user.authToken);
  useEffect(() => {
    setSearchedArray(contactsArray);
  }, [contactsArray]);

  const onChangeText = (text) => {
    setSearchText(text);
    let filterSearch = escapeRegExp(text);
    let list = contactsArray;
    let obj = [];
    if (filterSearch !== '') {
      list &&
        list.map((item) => {
          let answer =
            item.data &&
            item.data.filter((a) => compare(a?.user?.user_name, filterSearch));
          if (answer.length > 0) {
            obj.push({
              title: item.title,
              data: answer,
            });
          }
        });
      setSearchedArray(obj);
    } else {
      setSearchedArray(list);
    }
  };

  const compare = (a, searchTxt) => {
    return a.toLowerCase().toString().match(searchTxt.toLowerCase().toString());
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.rowStyle}
        onPress={() =>
          navigation.navigate('ContactInfo', {
            data: {
              name: item?.user?.user_name,
              profileUri: item?.user?.profile_image ?? null,
              short_name: item?.user?.short_name ?? '',
              ...item?.user,
            },
          })
        }>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.imageRowStyle}>
            {item?.user?.profile_image === DEFAULT_PROFILE_PIC ||
            item?.user?.profile_image === null ? (
              <DefaultProfileImage
                name={item?.user?.short_name}
                style={{flex: 1}}
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
          <Text style={styles.item}>{item?.user?.user_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => {
    return (
      <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.addContactMainView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddFriend');
          }}>
          <Text style={styles.addContactText}>{'Add Contact'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchMainView}>
        <CustomInputText
          value={searchText}
          onChangeText={(text) => onChangeText && onChangeText(text)}
          leftComponent={
            <AntDesign name={'search1'} size={wp(6)} color={color.gray} />
          }
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          placeholderColor={color.gray}
          placeholder={'Search'}
          clearButtonMode={'while-editing'}
        />
      </View>

      <View style={styles.sectionListMainView}>
        <SectionList
          sections={searchedArray || []}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  );
};
