import React from 'react';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import styles from './styles';
import {AppInfoHeader, DefaultProfileImage} from '../../Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

const ContactDetails = ({navigation, route}) => {
  const contact = route?.params?.data ?? [];
  const insets = useSafeAreaInsets();
  let authToken = useSelector((state) => state.user.authToken);

  const renderItem = ({item}) => {
    return (
      <View style={styles.rowContactStyle}>
        <View style={{}}>
          <Text
            style={{
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(10),
            }}>
            email
          </Text>
          <Text
            style={[styles.contactValuesText, {flex: 1}]}
            onPress={() => {
              Linking.openURL(`mailto:${item}`);
            }}>
            {item}
          </Text>
        </View>
      </View>
    );
  };

  const AddToContact = () => {
    Contacts.openContactForm({
      emailAddresses: [
        {
          label: 'work',
          email:
            contact?.emailAddresses.length > 0
              ? contact?.emailAddresses[0]
              : '',
        },
      ],
      phoneNumbers: [
        {
          label: 'mobile',
          number: contact?.phoneNumber,
        },
      ],
      displayName: contact?.displayName,
      givenName: contact?.displayName,
    }).then((r) => {
      if (r) {
        alert(contact?.displayName + ' is Added!');
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <AppInfoHeader
        headerText={'Contact Details'}
        leftComponent={
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name={'arrow-back-ios'}
              color={color.sky}
              size={hp(3)}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.separatorContainer}>
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
      </View>
      <View
        style={{
          flex: 0.12,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={[styles.imageNameContainer, {paddingHorizontal: wp(5)}]}>
          {contact?.hasThumbnail === false ? (
            <DefaultProfileImage
              name={contact?.short_name}
              style={[styles.profileImgMain]}
              labelStyle={{fontSize: normalize(20)}}
            />
          ) : contact?.thumbnailPath ? (
            <Image
              source={{uri: contact?.thumbnailPath}}
              resizeMode={'contain'}
              style={styles.profileImgMain}
            />
          ) : (
            <FastImage
              source={{
                uri: contact?.thumbnailPath,
                headers: {Authorization: authToken},
                priority: FastImage.priority.low,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.profileImgMain}
            />
          )}
        </View>

        <Text style={[styles.contactListName, {color: color.darkgray}]}>
          {contact?.displayName}
        </Text>
      </View>
      <View style={styles.separatorContainer}>
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: hp(1),
            justifyContent: 'center',
          }}
          onPress={AddToContact}>
          <Text style={styles.newContactText}>Create New Contact</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator, justifySelf: 'flex-end'},
          ]}
        />
        <TouchableOpacity
          style={{
            paddingVertical: hp(1),
            justifyContent: 'center',
          }}
          onPress={AddToContact}>
          <Text style={styles.newContactText}>Add to Existing Contact</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator, justifySelf: 'flex-end'},
          ]}
        />
      </View>
      <View style={styles.separatorContainer}>
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.transparent},
          ]}
        />
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
      </View>
      <View style={{flex: 0.45}}>
        {contact?.phoneNumber && (
          <View style={{flexDirection: 'row', flex: 0.5}}>
            <View style={styles.rowContactStyle}>
              <Text style={styles.labelContactText}>mobile</Text>
              <Text
                onPress={() => {
                  Linking.openURL(`tel:${contact?.phoneNumber}`);
                }}
                style={[
                  styles.contactValuesText,
                  {
                    flex: 1,
                  },
                ]}>
                {contact?.phoneNumber}
              </Text>
            </View>
            <View style={styles.contactIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${contact?.phoneNumber}`);
                }}>
                <AntDesign name={'videocamera'} size={20} color={color.sky} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`sms:${contact?.phoneNumber}`);
                }}>
                <Fontisto name={'hipchat'} size={20} color={color.sky} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${contact?.phoneNumber}`);
                }}>
                <Ionicons name={'call-outline'} size={20} color={color.sky} />
              </TouchableOpacity>

              {/*<Text*/}
              {/*  style={{*/}
              {/*    flex: 1,*/}
              {/*    fontFamily: fonts.Lato_Regular,*/}
              {/*    fontSize: normalize(10),*/}
              {/*  }}>*/}
              {/*  mobile*/}
              {/*</Text>*/}
            </View>
          </View>
        )}
        <View
          style={[
            styles.itemSeparatorStyle,
            {backgroundColor: color.separator},
          ]}
        />
        <FlatList
          data={contact?.emailAddresses || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
          bounces={false}
        />
      </View>
    </View>
  );
};
export default ContactDetails;
