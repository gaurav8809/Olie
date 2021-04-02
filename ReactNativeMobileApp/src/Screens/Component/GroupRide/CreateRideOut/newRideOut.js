import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {AppInfoHeader, DefaultProfileImage} from '../../../Common';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {calendar, camera, place_3} from '../../../Assets';
import CalendarPicker from 'react-native-calendar-picker';
import {openImagePicker} from '../../../../Helper/imageUpload';
import moment from 'moment';
import {getPlacesFromText} from '../../../../Redux/Actions/NavigationAction';

export const NewRideOut = (props) => {
  const {onCancel = null} = props;
  const {participants} = props;
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.userDetail);
  const friendsList = useSelector((state) => state?.friends?.olieFriends);
  const [selectedparticipants, setSelectedParticipants] = useState({});
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [CalendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [places, setPlaces] = useState(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const [location, setLocation] = useState('');

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

  const uploadGroupImage = () => {
    openImagePicker().then((image) => {
      setGroupImage(image);
    });
  };

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          <Text style={styles.userNameText}>{user.user_name}</Text>
        </View>
      </View>
    );
  };

  const getPlaces = async (text) => {
    await dispatch(getPlacesFromText(text))
      .then((response) => {
        setPlaces(response.results);
        console.log(places);
      })
      .catch((error) => {
        console.log('API not working:', error);
        setPlaces([]);
      });
  };

  const renderLocations = ({item, index}) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          setLocation(item.name);
          setPlaces([]);
        }}>
        <View style={styles.locations2Container}>
          <Image
            source={place_3}
            style={{height: hp(3), width: hp(3), resizeMode: 'contain'}}
          />
          <View>
            <Text numberOfLines={1} style={styles.locations2Text}>
              {item.name}
            </Text>
            <Text numberOfLines={2} style={styles.locations2Address}>
              {item.formatted_address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: color.white}}>
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        headerText={'Ride Out'}
        containerStyle={styles.headerStyle}
        rightComponent={
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.sideTextStyle]}>Create</Text>
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: wp(5),
          paddingVertical: hp(3.7),
        }}>
        <TouchableOpacity
          style={styles.imageGroupStyle}
          onPress={uploadGroupImage}>
          {!groupImage || groupImage === '' ? (
            <Image source={camera} style={styles.group2Image} />
          ) : (
            <Image
              source={{
                uri:
                  (typeof groupImage === 'object' && groupImage?.uri) ||
                  groupImage,
              }}
              style={{height: '100%', width: '100%'}}
              resizeMode={'cover'}
            />
          )}
        </TouchableOpacity>
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
      <View style={styles.graySpace} />
      <View style={styles.calendar2Container}>
        <Image
          source={calendar}
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <TouchableOpacity
          onPress={() => {
            setCalendarVisible(true);
          }}>
          <Text style={styles.calendar2Text}>
            {date ? moment(date).format('DD/MM/YYYY') : 'Set Date'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graySpace} />
      <View style={styles.location2Container}>
        <Image
          source={place_3}
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <TextInput
          placeholder={'Set Location'}
          style={styles.location2Input}
          value={location}
          onChangeText={(text) => {
            getPlaces(text);
            setLocation(text);
          }}
          placeholderTextColor={color.gray}
        />
      </View>
      <Modal transparent={true} visible={CalendarVisible}>
        <View style={styles.ModalContainer}>
          <View style={styles.calenderModalContainer}>
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
              <Text style={styles.calendarBtn}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {places === null || places.length === 0 ? (
        <View />
      ) : (
        <View style={styles.locationsContainer}>
          <FlatList
            data={places}
            renderItem={renderLocations}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <View style={styles.participantContainer}>
        <Text style={{fontFamily: fonts.Lato_Regular, color: color.gray}}>
          {selectedparticipants.length + 1} {'PARTICIPANTS'}
        </Text>
      </View>
      <ScrollView style={styles.selectedParticipantMainView}>
        <View style={styles.selectedContactInnerView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <Text style={styles.adminContainer}>{'You'}</Text>
            <Text style={styles.adminsubText}>Admin</Text>
          </View>
        </View>
        <FlatList
          data={selectedparticipants || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderParticipantsList}
          scrollEnabled={false}
        />
      </ScrollView>
    </ScrollView>
  );
};
