import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import mainStyles from '../../Map/styles';
import {hp, wp, color, normalize, isIOS} from '../../../../Helper/themeHelper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {ActionSheet, WhiteHole, GroupRidePopup, PopUp} from '../../../Common';
import RadialGradient from 'react-native-radial-gradient';
import {EventRegister} from 'react-native-event-listeners';
import {music} from '../../../Assets';
import {RNHoleView} from 'react-native-hole-view';
import {
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../../Helper/appHelper';
import Share from 'react-native-share';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setRideStatus} from '../../../../Redux/Actions/NavigationAction';
import {useDispatch} from 'react-redux';
import {AppleMusics} from './AppleMusics';

export const QuickStart = ({changeTab, navigation}) => {
  let [updatedRegion, setUpdatedRegion] = useState(INITIAL_REGION);
  let [actionSheet, setActionSheet] = useState(false);
  let [musicSheet, setMusicSheet] = useState(false);
  let [apple, setApple] = useState(false);
  let [defaultMusic, setDefaultMusic] = useState(true);
  let [viewGroupRideContact, setViewGroupRideContact] = useState(false);
  const dispatch = useDispatch();
  let routesOptions = [
    {
      label: 'Start Navigation',
      labelStyle: {
        color: color.gray,
        fontSize: normalize(12),
      },
      onPress: () => {},
    },
    {
      label: 'Solo Ride',
      onPress: () => {
        setActionSheet(false);
        // changeTab(1);
        dispatch(setRideStatus(0));
        navigation.navigate('StartingRideScreen', {screen: 'SoloRide'});
      },
    },
    {
      label: 'Group Ride',
      onPress: () => {
        setActionSheet(false);
        setViewGroupRideContact(true);
        //         dispatch(setRideStatus(0));
        //
        //         navigation.navigate('StartingRideScreen', {screen: 'GroupRide'});
        // changeTab(1);
      },
    },
  ];
  let musicOptions = [
    {
      label: 'Connect with your music service',
      labelStyle: {
        color: color.gray,
        fontSize: normalize(12),
      },
      onPress: () => {},
    },
    {
      label: 'Apple Music',
      onPress: () => {
        setMusicSheet(false);
        setApple(true);
      },
    },
    {
      label: 'Spotify',
      onPress: () => {
        setMusicSheet(false);
      },
    },
    {
      label: 'Set as preferred music service',
      labelStyle: {
        color: color.white,
        fontSize: normalize(13),
      },
      leftComponent: (
        <View>
          <MaterialCommunityIcons
            name={defaultMusic ? 'checkbox-blank-outline' : 'check-box-outline'}
            color={color.sky}
            size={hp(2.7)}
            style={{right: wp(2)}}
          />
        </View>
      ),
      onPress: () => setDefaultMusic(!defaultMusic),
    },
  ];

  useEffect(() => {
    getCurrentLocation();
    let listener = EventRegister.addEventListener('Start', onStartButtonClick);
    return () => EventRegister.removeEventListener(listener);
  }, []);

  const onStartButtonClick = () => {
    setActionSheet(true);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      const initRoute = {
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setUpdatedRegion(initRoute);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={updatedRegion}
        region={updatedRegion}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        style={[mainStyles.mapStyle]}
      />
      <WhiteHole />
      <ActionSheet
        data={routesOptions}
        visible={actionSheet}
        setActionSheet={() => setActionSheet(false)}
      />
      <ActionSheet
        data={musicOptions}
        visible={musicSheet}
        setActionSheet={() => setMusicSheet(false)}
      />
      <TouchableOpacity
        onPress={() => setMusicSheet(true)}
        style={styles.musicImage}>
        <Image source={music} style={{height: wp(10), width: wp(10)}} />
      </TouchableOpacity>
      {/*<PopUp*/}
      {/*  visible={viewGroupRideContact}*/}
      {/*  onRequestClose={() => setViewGroupRideContact(false)}*/}
      {/*  containerStyle={{*/}
      {/*    overflow: 'hidden',*/}
      {/*    flex:1*/}
      {/*  }}>*/}
      {viewGroupRideContact && (
        <GroupRidePopup
          title={'Select Group'}
          navigation={navigation}
          onClose={() => {
            setViewGroupRideContact(false);
          }}
        />
      )}
      {apple && (
        <AppleMusics
          title={'Apple Music'}
          onClose={() => {
            setApple(false);
          }}
        />
      )}
    </View>
  );
};
