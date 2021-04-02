import React, {useEffect, useState} from 'react';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../../../Helper/themeHelper';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import styles from './styles';
import {ArrowButton, DefaultProfileImage, PopUp} from '../../Common';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const SharedContact = (props) => {
  const [viewSentContact, setViewSentContact] = useState(false);
  const contact = props?.currentMessage?.contact || null;
  const renderContactInfo = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.lightSky,
          paddingVertical: hp(2),
        }}>
        <View
          style={{
            flex: 0.2,
            borderBottomWidth: wp(0.2),
            borderColor: color.gray,
            justifyContent: 'center',
          }}>
          {/*<View style={[styles.imageRowStyle, {marginHorizontal: wp(2)}]}>*/}
          {/*{contact?.hasThumbnail && (*/}
          {/*  <Image*/}
          {/*    source={contact?.thumbnailPath}*/}
          {/*    style={{height: wp(20), width: wp(20)}}*/}
          {/*    resizeMode={'contain'}*/}
          {/*  />*/}
          {/*)}*/}
          {/*</View>*/}
          <Text style={styles.contactListName}>{contact?.displayName}</Text>
        </View>
        <View style={{flex: 1}}>
          {contact?.phoneNumber && (
            <View style={styles.rowContactStyle}>
              <Entypo name={'mobile'} color={color.sky} size={hp(3)} />
              <Text
                onPress={() => {
                  Linking.openURL(`tel:${contact?.phoneNumber}`);
                }}
                style={{
                  ...styles.contactListName,
                  fontSize: normalize(16),
                  marginHorizontal: wp(4),
                }}>
                {contact?.phoneNumber}
              </Text>
            </View>
          )}
          <FlatList
            data={contact?.emailAddresses || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparatorStyle} />
            )}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            paddingHorizontal: wp(3),
          }}>
          <ArrowButton
            // btnStyle={{flex: 1}}
            onPress={() => setViewSentContact(false)}
            rotateDeg={210}
          />
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.rowContactStyle}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'mail'} color={color.sky} size={hp(3)} />
          <Text
            style={{
              ...styles.contactListName,
              fontSize: normalize(16),
              marginHorizontal: wp(4),
            }}
            onPress={() => {
              Linking.openURL(`mailto:${item.number}`);
            }}>{`${item}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.contactMsgContainer}>
      <TouchableOpacity
        style={styles.contactTouchable}
        onPress={() =>
          props.navigation.navigate('ContactDetails', {data: contact})
        }>
        <View style={[{marginHorizontal: wp(2)}]}>
          {(contact?.hasThumbnail && (
            <Image
              source={contact?.thumbnailPath}
              style={styles.imageRowStyle}
              resizeMode={'contain'}
            />
          )) || (
            <DefaultProfileImage
              name={contact?.short_name}
              style={styles.imageRowStyle}
            />
          )}
        </View>
        <Text style={styles.contactName} numberOfLines={2}>
          {contact?.displayName}
        </Text>
      </TouchableOpacity>
      {viewSentContact && (
        <PopUp
          visible={viewSentContact}
          onRequestClose={() => setViewSentContact(false)}
          containerStyle={{
            overflow: 'hidden',
            borderRadius: wp(5),
          }}>
          {viewSentContact && renderContactInfo()}
        </PopUp>
      )}
    </View>
  );
};
