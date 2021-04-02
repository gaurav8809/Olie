import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color, hp, wp} from '../../../Helper/themeHelper';
import styles from './styles';
import Geolocation from '@react-native-community/geolocation';
import {
  clock,
  live_location,
  place_1,
  refresh,
  search,
  train,
} from '../../Assets';
import mainStyles from './mapStyles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CustomInputText} from '../../Common';
import {CurrentMarker} from '../../Common/AppMarkers';
import {getPlacesFromText} from '../../../Redux/Actions/NavigationAction';
import {useDispatch} from 'react-redux';

const arr = [
  {
    id: 0,

    title: 'Some Current location',

    subtitle: 'Accurate to 10 m',
  },
  /*{
    id: 1,

    title: 'Some Current location',

    subtitle: 'Accurate to 10 m',
  },
  {
    id: 2,

    title: 'Some Current location',

    subtitle: 'Accurate to 10 m',
  },
  {
    id: 3,

    title: 'Some Current location',

    subtitle: 'Accurate to 10 m',
  },*/
];

export const SendLocationModal = (props) => {
  const {onClose = null, onSend = null} = props;
  const ASPECT_RATIO = wp(1) / hp(1);
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const insets = useSafeAreaInsets();

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.3318456,
    longitude: -122.0296002,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.3318456,
    longitude: -122.0296002,
  });
  const [searchText, setSearchText] = useState('');
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    return Geolocation.getCurrentPosition((info) => {
      const lat = parseFloat(info.coords.latitude);
      const long = parseFloat(info.coords.longitude);
      const initRoute = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      const initMarker = {
        latitude: lat,
        longitude: long,
      };
      setInitialRegion(initRoute);
      setMarkerPosition(initMarker);
    });
  };
  const renderListLocation = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.listLocationView}
        onPress={() => sendLocation()}>
        <Image
          source={place_1}
          resizeMode={'contain'}
          style={styles.locationImage}
        />
        <View style={styles.locationTitleView}>
          <Text style={styles.locationTitle}>{item.title}</Text>
          <Text style={styles.locationSubTitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = async (text) => {
    setSearchText(text);
    await dispatch(getPlacesFromText(text))
      .then((response) => {
        setPlaces(response.results);
      })
      .catch((error) => console.log('API not working:', error));
  };

  const renderPlaces = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          const route = {
            latitude: item?.geometry?.location?.lat ?? 0,
            longitude: item?.geometry?.location?.lng ?? 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          setInitialRegion({...route});
          setSearchText('');
          setPlaces([]);
        }}
        style={styles.placeContainer}>
        <Image
          source={
            places?.length > 0
              ? item.types.includes('train_station')
                ? train
                : place_1
              : clock
          }
          style={{height: wp(6), width: wp(6), resizeMode: 'contain'}}
        />
        <View style={{left: wp(4)}}>
          <Text style={styles.placeNameText}>{item.name}</Text>
          <Text style={styles.placeAddressText}>{item.formatted_address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const sendLocation = () => {
    onSend({
      message_file: initialRegion,
      message_file_type: 'location',
    });
    onClose && onClose();
  };

  const renderLocationView = () => {
    return (
      <View style={{flex: 1, paddingTop: insets.top > 0 ? insets.top : hp(1)}}>
        <View style={styles.mapHeadContainer}>
          <View style={styles.headCompContainer}>
            <Text
              style={styles.headCancel}
              onPress={() => {
                onClose && onClose();
              }}>
              {' '}
              Cancel
            </Text>
            <Text style={styles.headTitle}> Send Location</Text>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                getCurrentLocation();
              }}>
              <Image
                style={styles.headRefresh}
                resizeMode={'contain'}
                source={refresh}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <CustomInputText
              value={searchText}
              onChangeText={(text) => onSearch(text)}
              leftComponent={
                <Image
                  source={search}
                  style={{width: 20, height: 20, marginRight: 10}}
                />
              }
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              placeholderColor={color.gray}
              placeholder={'Search'}
              clearButtonMode={'while-editing'}
            />
          </View>
        </View>

        <View style={[mainStyles.mapContainer]}>
          {places?.length > 0 && searchText !== '' && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100000,
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{paddingBottom: hp(12)}}
                data={places?.length > 0 ? places : []}
                renderItem={renderPlaces}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={mainStyles.mapStyle}
            zoomEnabled={true}
            region={initialRegion}
            initialRegion={initialRegion}
            // onRegionChange={getCurrentLocation}
          >
            <Marker coordinate={initialRegion}>
              <CurrentMarker />
            </Marker>
          </MapView>
          <View style={styles.locationView}>
            <TouchableOpacity
              style={styles.locationListView}
              onPress={() => sendLocation()}>
              <Image
                source={live_location}
                resizeMode={'contain'}
                style={styles.liveLocation}
              />
              <Text style={styles.sendLiveText}>Share Live Location</Text>
            </TouchableOpacity>
            <View style={styles.nearByTextView}>
              <Text style={styles.nearByText}>Nearby Places</Text>
            </View>
            <FlatList
              data={arr}
              renderItem={renderListLocation}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              style={{flex: 1, paddingHorizontal: wp(3)}}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <Modal style={{flex: 1}} animationType={'slide'}>
      {renderLocationView()}
    </Modal>
  );
};
