import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {color, hp, wp} from '../../../../../../Helper/themeHelper';
import {toHHMMSS} from '../../../../../../Helper/validation';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import profileStyles from '../../../../Profile/styles';
import {AppBorderButton} from '../../../../../Common';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  GOOGLE_API_KEY,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../../../../Helper/appHelper';
import MapViewDirections from 'react-native-maps-directions';
import {
  CurrentMarker,
  DestinationMarker,
} from '../../../../../Common/AppMarkers';
import {RNHoleView} from 'react-native-hole-view';
import RadialGradient from 'react-native-radial-gradient';
import {FetchBestRide} from '../../../../../../Redux/Actions/ProfileAction';

export const BestRide = (props) => {
  const dispatch = useDispatch();
  const best_ride = useSelector((state) => state?.profile?.bestRide ?? []);

  let [coordinatesArray, setCoordinatesArray] = useState([
    {
      originCoord: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      destinationCoord: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    },
  ]);
  const {route_locations} = best_ride?.route ?? [];

  useEffect(() => {
    dispatch(FetchBestRide());
  }, []);

  useEffect(() => {
    for (let i = 0; i < best_ride?.route?.route_locations.length; i++) {
      let _coords = coordinatesArray;

      if (i === 0) {
        _coords[0].originCoord.latitude = parseFloat(
          best_ride?.route?.route_locations[i].location.latitude ?? 0,
        );
        _coords[0].originCoord.longitude = parseFloat(
          best_ride?.route?.route_locations[i].location.longitude ?? 0,
        );
        // _coords.originCoord.push(recent_ride?.route?.route_locations[i].longitude);
      } else {
        _coords[0].destinationCoord.latitude = parseFloat(
          best_ride?.route?.route_locations[i].location.latitude ?? 0,
        );
        _coords[0].destinationCoord.longitude = parseFloat(
          best_ride?.route?.route_locations[i].location.longitude ?? 0,
        );
      }
      setCoordinatesArray(_coords);
    }
  }, [best_ride]);

  const GRADIENT_VIEW = () => (
    <RNHoleView
      style={profileStyles.holeView}
      holes={[
        {
          x: wp(20),
          y: hp(10),
          width: wp(50),
          height: wp(50),
          borderRadius: wp(25),
        },
      ]}>
      <RadialGradient
        style={profileStyles.gradientView}
        colors={['rgba(255, 255, 255 , 0)', 'rgba(255, 255, 255 , 0.6)']}
        stops={[0.8, 1]}
        center={[wp(55), hp(15)]}
        radius={wp(40)}
      />
    </RNHoleView>
  );

  if (
    route_locations === undefined ||
    route_locations === null ||
    route_locations?.length <= 0
  ) {
    return <View />;
  }
  return (
    <View style={profileStyles.mapContainer}>
      <AppBorderButton
        label={'Best Ride'}
        btnStyle={profileStyles.btnRecentRide}
        labelStyle={profileStyles.btnRecentRideText}
        disabled={true}
      />
      <View style={profileStyles.textMapContainer}>
        <Text style={profileStyles.textTitle}>Highest Speed</Text>
        <Text style={profileStyles.textValue}>
          {parseFloat(best_ride.speed).toFixed(2)}
        </Text>
        <Text style={[profileStyles.textTitle, {marginTop: hp(2)}]}>
          Best time:
        </Text>
        <Text style={profileStyles.textValue}>{toHHMMSS(best_ride.time)}</Text>
      </View>
      {/*<MapView style={styles.mapStyle} />*/}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={profileStyles.mapStyle}
        region={{
          latitude: parseFloat(route_locations[0].location.latitude),
          longitude: parseFloat(route_locations[0].location.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        initialRegion={{
          latitude: parseFloat(route_locations[0].location.latitude),
          longitude: parseFloat(route_locations[0].location.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {/*{route_locations && route_locations.length > 0 && (*/}
        <MapViewDirections
          origin={{
            latitude: parseFloat(route_locations[0].location.latitude),
            longitude: parseFloat(route_locations[0].location.longitude),
          }}
          destination={{
            latitude: parseFloat(
              route_locations[route_locations.length - 1].location.latitude,
            ),
            longitude: parseFloat(
              route_locations[route_locations.length - 1].location.longitude,
            ),
          }}
          strokeWidth={wp(1)}
          strokeColor={color.sky}
          apikey={GOOGLE_API_KEY}
          // waypoints={coordinatesArray.destinationCoord.filter(
          //   (i, index) =>
          //     index !== routeInfo &&
          //     coordinatesArray.destinationCoord &&
          //     coordinatesArray.destinationCoord.length - 1,
          // )}
        />
        {/*)}*/}
        {route_locations &&
          route_locations.length > 0 &&
          route_locations.map(
            (i, index) =>
              index !== 0 && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(
                      route_locations[index].location.latitude,
                    ),
                    longitude: parseFloat(
                      route_locations[index].location.longitude,
                    ),
                  }}
                  key={index}>
                  <DestinationMarker />
                </Marker>
              ),
          )}
        <Marker.Animated
          coordinate={{
            latitude: parseFloat(route_locations[0].location.latitude),
            longitude: parseFloat(route_locations[0].location.longitude),
          }}>
          <CurrentMarker />
        </Marker.Animated>
      </MapView>

      <GRADIENT_VIEW />
    </View>
  );
};
