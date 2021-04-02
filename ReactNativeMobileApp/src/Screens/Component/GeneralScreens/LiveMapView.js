import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import haversine from 'haversine';
import Geolocation from '@react-native-community/geolocation';
import {INITIAL_REGION} from '../../../Helper/appHelper';
import {CurrentMarker} from '../../Common/AppMarkers';

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = INITIAL_REGION.latitudeDelta;
const LONGITUDE_DELTA = INITIAL_REGION.longitudeDelta;
const LATITUDE = INITIAL_REGION.latitude;
const LONGITUDE = INITIAL_REGION.longitude;

export default class LiveMapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      listener: 0,
      userMoved: 0,
    };
  }

  componentDidMount() {
    // this.getCurrentLocation();
    this.fetchLiveLocation();
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      this.setState({
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
      });
    });
  };

  fetchLiveLocation = () => {
    const {coordinate} = this.state;
    this.watchID = Geolocation.watchPosition(
      (position) => {
        this.setState({
          listener: this.state.listener + 1,
        });
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        coordinate.timing(newCoordinate).start();
        this.setState({
          userMoved: this.state.userMoved + 1,
        });

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = (newLatLng) => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    let {listener} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <CurrentMarker />
          </Marker.Animated>
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
            <Text style={styles.bottomBarContent}>
              {JSON.stringify(this.state.coordinate)} Marker cords
            </Text>
            <Text style={styles.bottomBarContent}>
              {JSON.stringify(this.state.listener)} Times listener called
            </Text>
            <Text style={styles.bottomBarContent}>
              {JSON.stringify(this.state.userMoved)} Times user moved
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
