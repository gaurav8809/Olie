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
import {ConfirmationModal} from './confirmationModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {calendar, camera, place_3, verified, website} from '../../../Assets';
import CalendarPicker from 'react-native-calendar-picker';
import {openImagePicker} from '../../../../Helper/imageUpload';
import moment from 'moment';
import {getPlacesFromText} from '../../../../Redux/Actions/NavigationAction';

export const NewSponseredRideOut = (props) => {
  const {onCancel = null} = props;
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [CalendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [addWebsite, setAddWebsite] = useState('');
  const [minParti, setMinParti] = useState('');
  const [maxParti, setMaxParti] = useState('');
  const [places, setPlaces] = useState(null);
  const [desc, setDesc] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const dispatch = useDispatch();

  const uploadGroupImage = () => {
    openImagePicker().then((image) => {
      setGroupImage(image);
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
        <View style={styles.locationContainer}>
          <Image
            source={place_3}
            style={{height: hp(3), width: hp(3), resizeMode: 'contain'}}
          />
          <View>
            <Text numberOfLines={1} style={styles.locationText}>
              {item.name}
            </Text>
            <Text numberOfLines={2} style={styles.locationAddress}>
              {item.formatted_address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onPopupClose = () => {
    setIsPopupVisible(false);
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: color.white}}>
      {isPopupVisible && <ConfirmationModal onClose={onPopupClose} />}
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        isHeaderComponent={true}
        containerStyle={styles.headerContainer}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              setIsPopupVisible(true);
            }}>
            <Text style={[styles.sideTextStyle]}>Create</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.groupDetailContainer}>
        <TouchableOpacity
          style={styles.imageGroupStyle}
          onPress={uploadGroupImage}>
          {!groupImage || groupImage === '' ? (
            <Image source={camera} style={styles.groupPhoto} />
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
      <View style={styles.websiteContainer}>
        <Image
          source={website}
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <TextInput
          placeholder={'Add Website'}
          style={styles.websiteInput}
          value={addWebsite}
          onChangeText={(text) => setAddWebsite(text)}
          placeholderTextColor={color.gray}
        />
      </View>
      <View style={styles.graySpace} />
      <View style={styles.dateContainer}>
        <Image
          source={calendar}
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <TouchableOpacity
          onPress={() => {
            setCalendarVisible(true);
          }}>
          <Text style={styles.dateText}>
            {date ? moment(date).format('DD/MM/YYYY') : 'Set Date'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graySpace} />
      <View style={styles.locContainer}>
        <Image
          source={place_3}
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <TextInput
          placeholder={'Set Location'}
          style={styles.locationInput}
          value={location}
          onChangeText={(text) => {
            getPlaces(text);
            setLocation(text);
          }}
          placeholderTextColor={color.gray}
        />
      </View>
      {places === null || places.length === 0 ? (
        <View style={styles.graySpace} />
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
      <View
        style={{
          height: hp(10),
          paddingLeft: wp(10),
        }}>
        <View style={styles.minParticipantContainer}>
          <Text style={styles.minText}>Min participants:</Text>
          <TextInput
            style={{
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(14),
              flex: 1,
            }}
            value={minParti}
            onChangeText={(text) => setMinParti(text)}
            placeholderTextColor={color.gray}
            keyboardType="numeric"
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <Text style={styles.maxText}>Max participants:</Text>
          <TextInput
            style={styles.maxInput}
            value={maxParti}
            onChangeText={(text) => setMaxParti(text)}
            placeholderTextColor={color.gray}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.graySpace} />
      <View
        style={{
          flex: 1,
          paddingLeft: wp(10),
        }}>
        <View
          style={{
            flex: 1,
            marginTop: hp(2),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.descText}>Description:</Text>
            <Text style={styles.descSubText}>Max 485 Characters</Text>
          </View>
          <TextInput
            style={styles.descInput}
            value={desc}
            onChangeText={(text) => setDesc(text)}
            placeholderTextColor={color.gray}
            multiline={true}
            maxLength={485}
          />
        </View>
      </View>
      <Modal transparent={true} visible={CalendarVisible}>
        <View style={styles.ModalContainer}>
          <View style={styles.calendarContainer}>
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
    </ScrollView>
  );
};
