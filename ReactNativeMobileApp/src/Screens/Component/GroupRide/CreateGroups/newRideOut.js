import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {AppInfoHeader, DefaultProfileImage} from '../../../Common';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {camera} from '../../../Assets';
import CalendarPicker from 'react-native-calendar-picker';

export const NewRideOut = (props) => {
  const {onCancel = null} = props;
  const {participants} = props;
  const friendsList = useSelector((state) => state?.friends?.olieFriends);
  const [selectedparticipants, setSelectedParticipants] = useState({});
  const [groupName, setGroupName] = useState('');
  const [CalendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    let data = [];
    _.map(friendsList, (i) =>
      _.find(i.data, (x) => {
        if (participants.includes(x.friend_user_id)) {
          data.push(x);
        }
      }),
    );
    setSelectedParticipants([...data]);
  }, [participants]);

  const removeParticipant = (user) => {
    let data = selectedparticipants;
    _.remove(data, (x) => x.friend_user_id === user);
    setSelectedParticipants([...data]);
    if (selectedparticipants.length === 0) {
      alert('Atleast One participant needed');
      onCancel();
    }
  };

  const renderParticipantsList = ({item}) => {
    const {user = null, friend_user_id} = item;
    return (
      <View style={styles.selectedContactInnerView}>
        <View>
          {user?.profile_image ? (
            <Image
              style={styles.selectedParticipantImage}
              source={{
                uri: user?.profile_image,
              }}
            />
          ) : (
            <DefaultProfileImage
              name={user?.short_name}
              style={styles.selectedParticipantImage}
            />
          )}
          <TouchableOpacity
            style={styles.selectedContactButtonView}
            onPress={() => {
              removeParticipant(friend_user_id);
            }}>
            <Ionicons name={'close'} color={color.white} size={wp(4)} />
          </TouchableOpacity>
        </View>
        {/*<Text>{displayName}</Text>*/}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        headerText={'New Ride Out'}
        containerStyle={{paddingTop: hp(2), backgroundColor: color.white}}
        rightComponent={
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.sideTextStyle]}>Create</Text>
          </TouchableOpacity>
        }
      />
      <View style={{flexDirection: 'row', paddingHorizontal: wp(5)}}>
        <View style={styles.imageGroupStyle}>
          <Image style={styles.selectedGroupImage} source={camera} />
        </View>
        <View style={styles.groupNameInputContainer}>
          <TextInput
            placeholder={'Group Name'}
            style={{
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(14),
            }}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            placeholderTextColor={color.gray}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: wp(5)}}>
        <View style={styles.imageSpaceStyle} />
        <View style={styles.groupDateInputContainer}>
          <TouchableOpacity
            onPress={() => {
              setCalendarVisible(true);
            }}>
            <Text
              style={{
                fontFamily: fonts.Lato_Regular,
                fontSize: normalize(14),
                color: color.gray,
              }}>
              {date ? date : 'Set Date'}
            </Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={CalendarVisible}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 50,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CalendarPicker
                  selectedDayColor={color.green_background}
                  selectedDayTextColor={color.white}
                  previousTitle={
                    <Ionicons
                      name="chevron-back-outline"
                      color={color.black_33}
                      size={hp(3.5)}
                    />
                  }
                  nextTitle={
                    <Ionicons
                      name="chevron-forward-outline"
                      color={color.black_33}
                      size={hp(3.5)}
                    />
                  }
                  weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                  textStyle={{
                    fontFamily: fonts.Lato_Regular,
                    color: color.black_33,
                  }}
                  onDateChange={(text) => {
                    console.log(text);
                    setDate(text.toString());
                    setBtnVisible(true);
                  }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: btnVisible
                      ? color.green_background
                      : color.gray,
                    width: wp(25),
                    height: hp(3),
                    marginTop: hp(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setBtnVisible(false);
                    setCalendarVisible(false);
                  }}
                  disable={btnVisible}>
                  <Text
                    style={{
                      color: color.white,
                      fontFamily: fonts.Lato_Bold,
                      fontSize: normalize(12),
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.selectedParticipantMainView}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selectedparticipants || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderParticipantsList}
        />
      </View>
    </View>
  );
};
