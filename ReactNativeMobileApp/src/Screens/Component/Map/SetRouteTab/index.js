import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import mainStyles from '../../Map/styles';
import {hp, wp, color, normalize, isIOS} from '../../../../Helper/themeHelper';
import Geolocation from '@react-native-community/geolocation';
import SetLocationScreen from './SetLocationScreen';
import {useSelector} from 'react-redux';
import {
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../../Helper/appHelper';
import {music} from '../../../Assets';
import {EventRegister} from 'react-native-event-listeners';
import RadialGradient from 'react-native-radial-gradient';
import {RNHoleView} from 'react-native-hole-view';
import {ActionSheet, CheckBox, WhiteHole} from '../../../Common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SetRoute = ({navigation}) => {
  const rideRoute = useSelector((state) => state?.navigation?.rideRoute ?? []);
  const [initialRegions, setInitialRegions] = useState(INITIAL_REGION);
  const [locationPopUp, setLocationPopUp] = useState(false);
  let [actionSheet, setActionSheet] = useState(false);
  let [defaultMusic, setDefaultMusic] = useState(true);
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
        setActionSheet(false);
      },
    },
    {
      label: 'Spotify',
      onPress: () => {
        setActionSheet(false);
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
          <CheckBox
            isChecked={!defaultMusic}
            checkboxStyle={[
              {borderWidth: 1, borderColor: color.sky},
              {backgroundColor: !defaultMusic ? color.sky : color.transparent},
            ]}
            onPress={() => setDefaultMusic(!defaultMusic)}
          />
        </View>
      ),
      onPress: () => setDefaultMusic(!defaultMusic),
    },
  ];
  useEffect(() => {
    let listener = EventRegister.addEventListener('Set', onSetButtonClick);
    return () => EventRegister.removeEventListener(listener);
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [rideRoute]);

  const onSetButtonClick = () => {
    setLocationPopUp(true);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      const initRoute = {
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setInitialRegions(initRoute);
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={mainStyles.mapStyle}
        region={initialRegions}
        initialRegion={initialRegions}
      />
      <WhiteHole />
      <ActionSheet
        data={musicOptions}
        visible={actionSheet}
        setActionSheet={() => setActionSheet(false)}
      />
      <TouchableOpacity
        onPress={() => setActionSheet(true)}
        style={styles.musicImage}>
        <Image source={music} style={{height: wp(10), width: wp(10)}} />
      </TouchableOpacity>
      <SetLocationScreen
        visible={locationPopUp}
        setVisible={() => setLocationPopUp(false)}
        navigation={navigation}
      />
    </View>
  );
};
