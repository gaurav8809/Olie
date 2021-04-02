import React, {useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mainStyles from '../../Map/styles';
import {color, hp, isIOS, normalize, wp} from '../../../../Helper/themeHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomPopUpModal from '../../../Common/BottomPopUpModal';
import {AppBorderButton, WhiteHole} from '../../../Common';
import RadialGradient from 'react-native-radial-gradient';
import {RNHoleView} from 'react-native-hole-view';
import {
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../../Helper/appHelper';
import {
  FetchRentals,
  setRideStatus,
} from '../../../../Redux/Actions/NavigationAction';
import {useDispatch, useSelector} from 'react-redux';
import {setBottomTabMiddleButtonInfo} from '../../../../Redux/Actions/SystemAction';

export const Rentals = (props) => {
  const {navigation} = props;

  let [updatedRegion, setUpdatedRegion] = useState(INITIAL_REGION);
  let [infoPopUp, setInfoPopUp] = useState(false);
  let [selectedRental, setSelectedRental] = useState({});
  let [rentalsArray, setRentalsArray] = useState([]);
  const dispatch = useDispatch();
  const rentalsData = useSelector((state) => state.navigation.rentalsData);

  useEffect(() => {
    rentalData();
  }, []);

  useEffect(() => {
    setRentalsArray(rentalsData);
    console.log(rentalsArray);
    dispatch(
      setBottomTabMiddleButtonInfo({
        label: 'Connect',
        visible: false,
      }),
    );
  }, [rentalsData]);

  const rentalData = () => {
    dispatch(FetchRentals());
  };

  const onRegionChange = (Region) => {
    let selectedRegion = {
      latitude: Region.latitude,
      longitude: Region.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setUpdatedRegion(selectedRegion);
  };

  const renderRentalsMarker = (item) => {
    const onPressRental = () => {
      setSelectedRental(item);

      setInfoPopUp(true);
    };

    return (
      <Marker
        onPress={onPressRental}
        onDragEnd={(e) => onRegionChange(e.nativeEvent.coordinate)}
        coordinate={{
          latitude: parseFloat(item.location.latitude),
          longitude: parseFloat(item.location.longitude),
        }}>
        {item.vehicle_type === 'bike' ? (
          <MaterialCommunityIcons
            name={'motorbike'}
            color={color.red}
            size={hp(3.5)}
          />
        ) : (
          <MaterialIcons
            name={'electric-scooter'}
            color={color.red}
            size={hp(3.5)}
          />
        )}
      </Marker>
    );
  };

  const renderStars = () => {
    let comp = [];
    for (let i = 0; i < 5; i++) {
      comp.push(
        <MaterialIcons
          name={'star'}
          color={i < selectedRental.stars ? color.black : color.gray}
          size={wp(5)}
        />,
      );
    }
    return comp;
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={updatedRegion}
        region={updatedRegion}
        provider={PROVIDER_GOOGLE}
        style={mainStyles.mapStyle}>
        {rentalsArray.map((i) => renderRentalsMarker(i))}
      </MapView>
      <WhiteHole />
      {infoPopUp && (
        <BottomPopUpModal
          visible={infoPopUp}
          contentContainerStyle={styles.rentalBottomPopUp}
          setBottomPopUp={() => setInfoPopUp(false)}>
          <View style={{width: wp(90), alignSelf: 'center'}}>
            <Text style={styles.popUpTitleText}>
              {selectedRental.vehicle_type === 'scooter'
                ? 'Scooter'
                : 'Santander Bike'}
            </Text>
            <Text style={styles.popUpDetailsText}>
              {selectedRental.description}
            </Text>
            <View
              style={{top: hp(2), flexDirection: 'row', alignItems: 'center'}}>
              {renderStars()}
              <Text style={{color: color.gray, left: wp(3)}}>
                {/*{selectedRental.gReviews + ' Google reviews'}*/}
                {4 + ' Google reviews'}
              </Text>
            </View>
            <View
              style={{
                top: hp(4),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                {selectedRental.website !== "" && <AppBorderButton
                    label={'Website'}
                    labelStyle={{color: color.sky, fontSize: normalize(12)}}
                    btnStyle={styles.popUpWebsiteBtn}
                    onPress={() => {
                      Linking.openURL(`http://${selectedRental.website}`);
                    }}
                  />
                }
                <AppBorderButton
                  label={'Direction'}
                  labelStyle={{color: color.sky, fontSize: normalize(12)}}
                  btnStyle={styles.popUpDirectionBtn}
                  onPress={() => {
                    dispatch(setRideStatus(0));
                    navigation.navigate('StartingRideScreen', {
                      screen: 'RepairRentals',
                      data: selectedRental.location,
                    });
                  }}
                />
              </View>
              {selectedRental.vehicle_type === 'bike' ? (
                <MaterialCommunityIcons
                  name={'motorbike'}
                  color={color.red}
                  size={hp(3.5)}
                />
              ) : (
                <MaterialIcons
                  name={'electric-scooter'}
                  color={color.red}
                  size={hp(3.5)}
                />
              )}
            </View>
          </View>
        </BottomPopUpModal>
      )}
    </View>
  );
};
