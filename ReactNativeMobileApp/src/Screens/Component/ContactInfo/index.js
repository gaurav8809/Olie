import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {AppInfoHeader, ActionSheet, DefaultProfileImage} from '../../Common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color, hp, isANDROID, normalize} from '../../../Helper/themeHelper';
import {download, photo_gallary, search_chat, volume_off} from '../../Assets';
import {saveToCameraActionSheet, muteGroupActionSheet} from './data';
import Share from 'react-native-share';

const ContactInfo = ({navigation, route}) => {
  const [actionSheet, setActionSheet] = useState(null);

  const profileURI = route?.params?.data?.profileUri ?? '';
  const userName = route?.params?.data?.name ?? '';
  const short_name = route?.params?.data?.short_name ?? '';
  const phone = route?.params?.data?.phone ?? '';
  const email = route?.params?.data?.email ?? '';

  const closeActionSheet = () => setActionSheet(null);

  return (
    <View style={{flex: 1}}>
      <AppInfoHeader
        headerText={'Contact Info'}
        leftComponent={
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name={'arrow-back-ios'}
              color={color.sky}
              size={hp(3)}
            />
            <Text
              style={[
                styles.smallText,
                {color: color.sky, fontSize: normalize(12)},
              ]}>
              {userName}
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={{backgroundColor: color.light_background}}>
        <View>
          {profileURI && profileURI !== '' ? (
            <Image
              style={{flex: 1, height: hp(25)}}
              source={{
                uri: profileURI,
              }}
            />
          ) : (
            <DefaultProfileImage
              name={short_name}
              style={{flex: 1, height: hp(25)}}
              labelStyle={{fontSize: normalize(100)}}
            />
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.titleText]}>{userName}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.smallText,
              {
                color: color.gray,
              },
            ]}>
            {'Busy'}
          </Text>
        </View>

        {/*  <View style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => navigation.navigate('MediaLinksDocs')}>
            <Image
              source={photo_gallary}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>
              {'Media, Links and Docs'}
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleContainer}>
            <Image
              source={search_chat}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>{'Chat Search'}</Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() =>
              setActionSheet(saveToCameraActionSheet(closeActionSheet))
            }>
            <Image
              source={download}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>
              {'Save to Camera Roll'}
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() =>
              setActionSheet(muteGroupActionSheet(closeActionSheet))
            }>
            <Image
              source={volume_off}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>{'Mute Group'}</Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
        </View>*/}

        <View style={[styles.boxContainer, {marginBottom: hp(0)}]}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => {
              let message = '';
              if (phone && phone !== '') {
                message += `Hi, This is from Olie. you can add ${userName} to your friend list by adding '${phone}' phone number.`;
              } else if (email && email !== '') {
                message += `Hi, This is from Olie. you can add ${userName} to your friend list by adding '${email}' email address.`;
              }
              if (message !== '') {
                const shareOptions = {
                  title: 'Share Contact of ' + userName,
                  message: message,
                  failOnCancel: false,
                };
                Share.open(shareOptions)
                  .then((res) => {})
                  .catch((err) => {
                    err && console.log(err);
                  });
              }
            }}>
            <Text style={[styles.smallText, {flex: 1, color: color.sky}]}>
              {'Share Contact'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={[styles.boxContainer, {marginTop: hp(0)}]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.smallText, {flex: 1, color: color.red}]}>
              {'Clear Chat'}
            </Text>
          </View>
        </View>*/}
      </ScrollView>

      <ActionSheet
        containerStyle={{paddingBottom: hp(0)}}
        data={actionSheet}
        visible={actionSheet !== null}
        setActionSheet={() => setActionSheet(null)}
      />
    </View>
  );
};
export default ContactInfo;
