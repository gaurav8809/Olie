import React, {useEffect, useState} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import mainStyles from '../styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import BottomPopUpModal from '../../../Common/BottomPopUpModal';
import {AppBorderButton, WhiteHole} from '../../../Common';
import {FetchRepairShop} from '../../../../Redux/Actions/RepairShopAction';
import {gear} from '../../../Assets';
import {
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../../Helper/appHelper';
import {useDispatch, useSelector} from 'react-redux';
import {setRideStatus} from '../../../../Redux/Actions/NavigationAction';

let currentDate = new Date();
let currentDay = currentDate.getDay();

export const RepairTab = (props) => {
  const {navigation} = props;
  let [updatedRegion, setUpdatedRegion] = useState(INITIAL_REGION);
  let [infoPopUp, setInfoPopUp] = useState(false);
  let [selectedRental, setSelectedRental] = useState({});
  let [repairShopArray, setRepairShopArray] = useState([]);

  const repairShopData = useSelector(
    (state) => state.repairShop.repairShopData,
  );

  const dispatch = useDispatch();

  const onRegionChange = (Region) => {
    let selectedRegion = {
      latitude: Region.latitude,
      longitude: Region.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setUpdatedRegion(selectedRegion);
  };

  useEffect(() => {
    repairData();
  }, []);

  useEffect(() => {
    setRepairShopArray(repairShopData);
  }, [repairShopData]);

  const repairData = () => {
    dispatch(FetchRepairShop());
  };

  const renderRepairMarker = (item) => {
    console.log(item);
    const onPressRental = () => {
      setSelectedRental(item);

      setInfoPopUp(true);
    };

    return (
      <Marker
        title={item.title}
        onPress={onPressRental}
        onDragEnd={(e) => onRegionChange(e.nativeEvent.coordinate)}
        coordinate={{
          latitude: parseFloat(item.location.latitude),
          longitude: parseFloat(item.location.longitude),
        }}>
        <Image
          resizeMode={'contain'}
          source={gear}
          style={{width: wp(6), height: wp(6)}}
        />
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={updatedRegion}
        region={updatedRegion}
        provider={PROVIDER_GOOGLE}
        style={mainStyles.mapStyle}>
        {repairShopArray && repairShopArray.map((i) => renderRepairMarker(i))}
      </MapView>
      <WhiteHole />
      {infoPopUp && (
        <BottomPopUpModal
          visible={infoPopUp}
          contentContainerStyle={[styles.popUpInfoContainer]}
          setBottomPopUp={() => setInfoPopUp(false)}>
          <View style={{width: wp(90), alignSelf: 'center'}}>
            <Text style={styles.popUpTitleText} numberOfLines={1}>
              {selectedRental.title}
            </Text>
            <Text style={styles.popUpDetailsText}>
              {selectedRental.description}
            </Text>
            <View style={styles.popUpTimeView}>
              <Text
                style={{
                  color: color.black,
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Bold,
                }}>
                Hours:
              </Text>
              <Text style={{color: color.gray, left: wp(3)}}>
                {selectedRental.work_hours[currentDay].start +
                  '-' +
                  selectedRental.work_hours[currentDay].end}
              </Text>
              <Text style={{color: color.green_background, marginLeft: wp(4)}}>
                {selectedRental.status === true ? ' (opened) ' : ' (closed)'}
              </Text>
            </View>
            <View style={styles.popUpButtonsView}>
              <View style={{flexDirection: 'row'}}>
                <AppBorderButton
                  label={'Website'}
                  labelStyle={{color: color.sky, fontSize: normalize(12)}}
                  btnStyle={styles.popUpWebsiteBtn}
                  onPress={() => {
                    Linking.openURL(`http://${selectedRental.website}`);
                  }}
                />
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
                <AppBorderButton
                  label={'Call'}
                  labelStyle={{color: color.sky, fontSize: normalize(12)}}
                  btnStyle={styles.popUpCallBtn}
                  onPress={() => {
                    Linking.openURL(`tel:${selectedRental.contact_no}`);
                  }}
                />
              </View>
              <Image
                resizeMode={'contain'}
                source={gear}
                style={{width: wp(6), height: wp(6)}}
              />
            </View>
          </View>
        </BottomPopUpModal>
      )}
    </View>
  );
};
