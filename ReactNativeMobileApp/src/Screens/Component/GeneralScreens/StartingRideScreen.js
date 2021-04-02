import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  BackHandler,
} from 'react-native';
import styles from './styles';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  hp,
  wp,
  color,
  fonts,
  normalize,
  isANDROID,
  isIOS,
} from '../../../Helper/themeHelper';
import Geolocation from '@react-native-community/geolocation';
import {CurrentMarker, DestinationMarker} from '../../Common/AppMarkers';
import {GROUP_RIDE, REPAIR_RENTALS, SOLO_RIDE} from '../../../Helper/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  groupLiveLocationSocket,
  leaveGroupRideSocket,
  sendLiveLocationSocket,
} from '../../../Socket';
import ViewShot from 'react-native-view-shot';

import {
  convertMetersToMiles,
  convertMphToKph,
  GOOGLE_API_KEY,
  INITIAL_REGION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  measurementConversion,
} from '../../../Helper/appHelper';
import {
  CreateRoute,
  getRouteDistance,
  setFavouriteRides,
  setRideStatus,
  setRidingDetails,
  CreateActivity,
} from '../../../Redux/Actions/NavigationAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppButton, CircularButton, WhiteHole} from '../../Common';
import RadialGradient from 'react-native-radial-gradient';
import {RNHoleView} from 'react-native-hole-view';
import {StackActions} from '@react-navigation/native';
import {SwappableBottomPopUp} from '../../Common/SwappableBottomPopUp';
import Geocoder from 'react-native-geocoder';
import Share from 'react-native-share';
import {StopWatch} from '../Map/SetRouteTab/StopWatch';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setBottomTabMiddleButtonInfo} from '../../../Redux/Actions/SystemAction';
import Snackbar from 'react-native-snackbar';
const StartingRideScreen = ({navigation, route}) => {
  // ---------- Const ----------- //
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetail);
  const isMetric = useSelector((state) => state?.conversions?.isMetric);
  const rideRoute = useSelector((state) => state?.navigation?.rideRoute ?? []);
  const favouriteRides = useSelector(
    (state) => state?.navigation?.favouriteRides ?? [],
  );
  const ridingDetails = useSelector(
    (state) => state?.navigation?.ridingDetails ?? [],
  );
  const viewRef = useRef(null);
  const {status, routeDetails} = ridingDetails;
  const {originInfo} = routeDetails;
  const screenCheck = route?.params?.screen;
  const groupData = route?.params?.groupData;
  const [getLocation, setSelLocation] = useState([]);
  const [
    canCallFetchLiveLocationFlag,
    setCanCallFetchLiveLocationFlag,
  ] = useState(true);
  const [groupRideUserDetails, setGroupRideUserDetails] = useState([]);
  let selectedRoute = route?.params?.selectedRoute;
  let repairRentalData = route?.params?.data;
  let totalCoveredDistace = 0;
  let isFavorite = route?.params?.is_Favorite;
  // ---------- State ----------- //
  let watchID;
  let [routeInfo, setRouteInfo] = useState({
    cordsArray: [],
    distanceMatrix: {},
    distanceValue: 0,
    distanceInMeters: 0,
  });
  let {cordsArray, distanceValue, distanceMatrix, distanceInMeters} = routeInfo;
  let [initialRegions, setInitialRegions] = useState(INITIAL_REGION);
  let [updatedRegion, setUpdatedRegion] = useState(INITIAL_REGION);
  const authToken = useSelector((state) => state.user.authToken);
  let [prevLatLng, setPrevLatLng] = useState({
    latitude: 0,
    longitude: 0,
  });
  const insets = useSafeAreaInsets();

  let [locationDetailedResult, setLocationDetailedResult] = useState({
    route_id: 0,
    distance: 0,
    speed: 0,
    time: 0,
    calories: 0,
    points: 0,
  });
  let [userSpeed, setUserSpeed] = useState(0);
  let [routeCords, setRouteCords] = useState([]);
  let [distanceTravelled, setDistanceTravelled] = useState(0);
  let [calories, setCalories] = useState([]);
  let [title, setTitle] = useState('Tuesday');
  let [description, setDescription] = useState('From Set Route');
  let [total_distance, setTotalDistance] = useState('5.05');
  let [locations, setLocations] = useState([]);
  let [result, setResult] = useState({Result: {}});
  const [finishButtonFlag, setFinishButtonFlag] = useState(false);
  let [speed, setSpeed] = useState(0);
  let [userCalories, setUserCalories] = useState([]);
  let [angle, setAngle] = useState(0);

  let [data, setData] = useState({
    title: title,
    description: description,
    total_distance: total_distance,
    locations: locations,
  });
  let [stopWatchTimeStart, setStopWatchTimeStart] = useState(false);
  let [stopWatchTimeReset, setStopWatchTimeReset] = useState(false);
  let [stopWatchTime, setStopWatchTime] = useState(0);
  let [toggleFav, setToggleFev] = useState(isFavorite);

  const toggleStopwatch = (isTimerStart) => {
    // setStopWatchTimeStart(!stopWatchTimeStart);
    setStopWatchTimeStart(isTimerStart);
    setStopWatchTimeReset(false);
  };

  const resetStopwatch = () => {
    setStopWatchTimeReset(true);
    setStopWatchTimeStart(false);
  };

  const coordinate = new AnimatedRegion({
    latitude: INITIAL_REGION.latitude,
    longitude: INITIAL_REGION.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  let [arrQuickCurrentLocation, setArrQuickCurrentLocation] = useState([]);
  const [latLangValues, setLatLangValues] = useState({
    newValues: {latitude: 0, longitude: 0},
    prevLatLng: {latitude: 0, longitude: 0},
  });

  let tempGroupRideUsers = [];
  useEffect(() => {
    if (screenCheck === GROUP_RIDE) {
      groupLiveLocationSocket(async (data) => {
        await setGroupRideUserDetails(data);
      });
    }
  }, [screenCheck]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    if (status === 3) {
      Snackbar.show({
        text: 'Please Finish or Share ride',
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch(
        setBottomTabMiddleButtonInfo({
          label: 'Connect',
          visible: true,
        }),
      );
      dispatch(setRideStatus(0));
      // navigation.dispatch(StackActions.replace('Home'));

      return true;
      // navigation.goBack();
    } else {
      Snackbar.show({
        text: "You can't press go back without complete ride",
        duration: Snackbar.LENGTH_SHORT,
      });
      return true;
    }
  };

  // ---------- Config ----------- //
  useEffect(() => {
    canCallFetchLiveLocationFlag && fetchLiveLocation();
    return () => Geolocation.clearWatch(watchID);
  }, [angle]);
  useEffect(() => {
    fillRidingDetails().then((res) => {});
  }, []);
  const fillRidingDetails = async () => {
    (await ridingDetails) &&
      ridingDetails.routeDetails &&
      !ridingDetails.routeDetails.originInfo &&
      (await getCurrentRidingDetail().then((res) => {}));
  };
  useEffect(() => {
    getCurrentLocation();
  }, [rideRoute]);

  useEffect(() => {
    cordsArray && cordsArray.length > 0 && getDistance();
  }, [routeInfo.cordsArray]);

  useEffect(() => {
    distanceValue !== null && getLocationData();
  }, [distanceValue]);

  // ---------- Helpers ----------- //
  const setRouteInfoValues = (field, value) => {
    setRouteInfo({...routeInfo, [field]: value});
  };

  const getLocationData = async () => {
    await Geocoder.geocodePosition({
      lat: initialRegions.latitude,
      lng: initialRegions.longitude,
    }).then((res) => {
      dispatch(
        setRidingDetails({
          ...ridingDetails,
          routeDetails: {
            rideRoute: rideRoute,
            originInfo: res[0],
            distanceInfo: Object.assign({
              ...distanceMatrix,
              distanceValueInMiles: distanceValue,
              distanceValueInMeters: distanceInMeters,
            }),
          },
        }),
      );
    });
  };
  const prepareRoutePath = async () => {
    let arr = [];
    let _originSequence = 1;
    let arrCurrentLocationDetails = [];
    if (
      rideRoute &&
      rideRoute.length > 0 &&
      screenCheck !== 'NavigationTab' &&
      screenCheck !== REPAIR_RENTALS
    ) {
      if (ridingDetails?.routeDetails?.originInfo?.length < 0) {
        getLocationData().then((res) => {
          let _originTitle =
            ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
          let _originPlaceID = '';

          let _originLatitude =
            ridingDetails?.routeDetails?.originInfo?.position?.lat ?? 0;
          let _originLongitude =
            ridingDetails?.routeDetails?.originInfo?.position?.lng ?? 0;
          let _originFormattedAddress =
            ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
          arrCurrentLocationDetails.push({
            title: _originTitle,
            place_id: _originPlaceID,
            latitude: _originLatitude,
            longitude: _originLongitude,
            sequence: _originSequence,
            other_info: {formatted_address: _originFormattedAddress},
          });
        });
      } else {
        let _originTitle =
          ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
        let _originPlaceID = '';

        let _originLatitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lat ?? 0;
        let _originLongitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lng ?? 0;
        let _originFormattedAddress =
          ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
        arrCurrentLocationDetails.push({
          title: _originTitle,
          place_id: _originPlaceID,
          latitude: _originLatitude,
          longitude: _originLongitude,
          sequence: _originSequence,
          other_info: {formatted_address: _originFormattedAddress},
        });
      }

      rideRoute.map((i, index) => {
        arr.push({
          latitude: i.geometry.location.lat,
          longitude: i.geometry.location.lng,
        });

        // _locData.concat({
        //     name: i.name, sequence: index + 1
        // });
        let _incSeq = index + 1;
        let _title = i.name;
        let _placeId = i.place_id;
        let _latitude = i.geometry.location.lat;
        let _longitude = i.geometry.location.lng;
        let _formatted_address = i.formatted_address;
        let _seq = _incSeq + 1;
        arrCurrentLocationDetails.push({
          title: _title,
          place_id: _placeId,
          latitude: _latitude,
          longitude: _longitude,
          sequence: _seq,
          other_info: {formatted_address: _formatted_address},
        });
      });
      setSelLocation(arrCurrentLocationDetails);
      await setLocations(arrCurrentLocationDetails);
      let _locs;
      _locs = arrCurrentLocationDetails;
      setLocations(_locs);
      setRouteInfoValues('cordsArray', arr);
    } else if (repairRentalData && screenCheck === REPAIR_RENTALS) {
      if (
        ridingDetails?.routeDetails?.originInfo?.length < 0 ||
        ridingDetails?.routeDetails?.originInfo === undefined
      ) {
        getLocationData().then((res) => {
          let _originTitle =
            ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
          let _originPlaceID = '';

          let _originLatitude =
            parseFloat(
              ridingDetails?.routeDetails?.originInfo?.position?.lat,
            ) ?? 0;
          let _originLongitude =
            parseFloat(
              ridingDetails?.routeDetails?.originInfo?.position?.lng,
            ) ?? 0;
          let _originFormattedAddress =
            ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
          arrCurrentLocationDetails.push({
            title: _originTitle,
            place_id: _originPlaceID,
            latitude: _originLatitude,
            longitude: _originLongitude,
            sequence: _originSequence,
            other_info: {formatted_address: _originFormattedAddress},
          });
        });
      } else {
        let _originTitle =
          ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
        let _originPlaceID = '';

        let _originLatitude =
          parseFloat(ridingDetails?.routeDetails?.originInfo?.position?.lat) ??
          0;
        let _originLongitude =
          parseFloat(ridingDetails?.routeDetails?.originInfo?.position?.lng) ??
          0;
        let _originFormattedAddress =
          ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
        arrCurrentLocationDetails.push({
          title: _originTitle,
          place_id: _originPlaceID,
          latitude: _originLatitude,
          longitude: _originLongitude,
          sequence: _originSequence,
          other_info: {formatted_address: _originFormattedAddress},
        });
      }
      arr.push({
        latitude: parseFloat(repairRentalData.latitude),
        longitude: parseFloat(repairRentalData.longitude),
      });
      let _incSeq = 1;
      let _title = repairRentalData.title;
      let _placeId =
        repairRentalData.place_id !== null ? repairRentalData.place_id : 0;
      let _latitude = parseFloat(repairRentalData.latitude);
      let _longitude = parseFloat(repairRentalData.longitude);
      let _formatted_address =
        repairRentalData.other_info?.formatted_address ?? '';
      let _seq = _incSeq + 1;
      arrCurrentLocationDetails.push({
        title: _title,
        place_id: _placeId,
        latitude: _latitude,
        longitude: _longitude,
        sequence: _seq,
        other_info: {formatted_address: _formatted_address},
      });
      // });
      // setLocations({locations: arrLocationDetails});

      // arrCurrentLocationDetails.push(arrLocationDetails[0]);
      let _arrCurrentLocationDetails = arrCurrentLocationDetails;
      setSelLocation(arrCurrentLocationDetails);
      // let _loc=locations;
      // _loc.push(arrCurrentLocationDetails);
      // _loc.push(arrLocationDetails);
      // setLocations(arrCurrentLocationDetails);
      // let _loc=locations;
      // _loc.append(arrLocationDetails)
      await setLocations(arrCurrentLocationDetails);
      let destinationArray = arr;
      // destinationArray.shift();
      setRouteInfoValues('cordsArray', destinationArray);
    } else {
      if (selectedRoute && selectedRoute.length > 0) {
        let arr = [];
        let _originSequence = 1;
        let arrCurrentLocationDetails = [];
        let _originTitle =
          ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
        let _originPlaceID = '';

        let _originLatitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lat ?? 0;
        let _originLongitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lng ?? 0;
        let _originFormattedAddress =
          ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
        selectedRoute.map((i, index) => {
          arr.push({
            latitude: parseFloat(i.location.latitude),
            longitude: parseFloat(i.location.longitude),
          });
          let _incSeq = index;
          let _title = i.location.title;
          let _placeId = i.place_id;
          let _latitude = parseFloat(i.location.latitude);
          let _longitude = parseFloat(i.location.longitude);
          let _formatted_address =
            i.location.other_info?.formatted_address ?? '';
          let _seq = _incSeq + 1;
          arrCurrentLocationDetails.push({
            title: _title,
            place_id: _placeId,
            latitude: _latitude,
            longitude: _longitude,
            sequence: _seq,
            other_info: {formatted_address: _formatted_address},
          });
        });
        // setLocations({locations: arrLocationDetails});

        // arrCurrentLocationDetails.push(arrLocationDetails[0]);
        let _arrCurrentLocationDetails = arrCurrentLocationDetails;
        let _preLatLng = {
          latitude: parseFloat(selectedRoute[0].location.latitude),
          longitude: parseFloat(selectedRoute[0].location.longitude),
        };

        setPrevLatLng(_preLatLng);
        latLangValues.prevLatLng.latitude = parseFloat(
          selectedRoute[0].location.latitude,
        );
        latLangValues.prevLatLng.longitude = parseFloat(
          selectedRoute[0].location.longitude,
        );
        setLocations(arrCurrentLocationDetails);
        let destinationArray = arr;
        destinationArray.shift();
        setRouteInfoValues('cordsArray', destinationArray);
      }
    }
  };

  const getDistance = async () => {
    let origins = `${initialRegions.latitude},${initialRegions.longitude}`;
    let destinations = [];
    routeInfo.cordsArray.map((i) =>
      destinations.push(`${i.latitude},${i.longitude}`),
    );
    await dispatch(getRouteDistance(origins, destinations.join('|')))
      .then((res) => {
        let distanceVal = 0;
        res.rows[0].elements.map((i) => {
          distanceVal = distanceVal + i.distance.value;
        });

        setRouteInfo({
          ...routeInfo,
          distanceMatrix: res,
          distanceValue: convertMetersToMiles(distanceVal),
          distanceInMeters: distanceVal,
        });
      })
      .catch((e) => {});
  };
  const getFinishRideLocation = async () => {
    await Geolocation.getCurrentPosition((info) => {
      const initRoute = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setInitialRegions(initRoute);

      Geocoder.geocodePosition({
        lat: initialRegions.latitude,
        lng: initialRegions.longitude,
      }).then((res) => {
        dispatch(
          setRidingDetails({
            ...ridingDetails,
            routeDetails: {
              rideRoute: rideRoute,
              originInfo: res[0],
              distanceInfo: Object.assign({
                ...distanceMatrix,
                distanceValueInMiles: distanceValue,
                distanceValueInMeters: distanceInMeters,
              }),
            },
          }),
        );
      });
    });
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      const initRoute = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setAngle(info.coords.heading);

      status < 1 ? setInitialRegions(initRoute) : setUpdatedRegion(initRoute);
      if (screenCheck !== SOLO_RIDE && screenCheck !== GROUP_RIDE) {
        prepareRoutePath();
      } else {
        let _originSequence = 1;
        let _originTitle =
          ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
        let _originPlaceID = '';

        let _originLatitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lat ?? 0;
        let _originLongitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lng ?? 0;
        let _originFormattedAddress =
          ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
        let _arrQuickCurrentLocation = [];
        _arrQuickCurrentLocation.push({
          title: _originTitle,
          place_id: _originPlaceID,
          latitude: _originLatitude,
          longitude: _originLongitude,
          sequence: _originSequence,
          other_info: {formatted_address: _originFormattedAddress},
        });

        setArrQuickCurrentLocation(_arrQuickCurrentLocation);
      }
    });
  };
  const getCurrentRidingDetail = async () => {
    await getCurrentLocation();

    if (screenCheck !== 'NavigationTab') {
      await Geocoder.geocodePosition({
        lat: initialRegions.latitude,
        lng: initialRegions.longitude,
      }).then(async (res) => {
        await dispatch(
          setRidingDetails({
            ...ridingDetails,
            routeDetails: {
              ...ridingDetails.routeDetails,
              originInfo: res[0],
              distanceInfo: Object.assign({
                ...distanceMatrix,
                distanceValueInMiles: distanceValue,
                distanceValueInMeters: distanceInMeters,
              }),
            },
          }),
        );
      });
    } else {
      await Geocoder.geocodePosition({
        lat: parseFloat(selectedRoute[0].location.latitude),
        lng: parseFloat(selectedRoute[0].location.longitude),
      }).then(async (res) => {
        setInitialRegions({
          latitude: parseFloat(selectedRoute[0].location.latitude),
          longitude: parseFloat(selectedRoute[0].location.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        setPrevLatLng({
          latitude: parseFloat(selectedRoute[0].location.latitude),
          longitude: parseFloat(selectedRoute[0].location.longitude),
        });
        await dispatch(
          setRidingDetails({
            ...ridingDetails,
            routeDetails: {
              ...ridingDetails.routeDetails,
              originInfo: res[0],
              distanceInfo: Object.assign({
                ...distanceMatrix,
                distanceValueInMiles: distanceValue,
                distanceValueInMeters: distanceInMeters,
              }),
            },
          }),
        );
      });
    }
  };
  const onPressStart = async () => {
    await getCurrentLocation();

    screenCheck !== 'NavigationTab'
      ? await getCurrentLocation()
      : await prepareRoutePath();

    await Geocoder.geocodePosition({
      lat: initialRegions.latitude,
      lng: initialRegions.longitude,
    }).then((res) => {
      dispatch(
        setRidingDetails({
          ...ridingDetails,
          routeDetails: {
            ...ridingDetails.routeDetails,
            originInfo: res[0],
            distanceInfo: Object.assign({
              ...distanceMatrix,
              distanceValueInMiles: distanceValue,
              distanceValueInMeters: distanceInMeters,
            }),
          },
        }),
      );
      // toggleStopwatch();

      setUpdatedRegion(initialRegions);
      if (
        screenCheck !== SOLO_RIDE &&
        screenCheck !== GROUP_RIDE &&
        screenCheck !== REPAIR_RENTALS
      ) {
        if (locations[0].latitude === 0) {
          // locations.shift();
          locations[0].title = ridingDetails.routeDetails.originInfo.streetName;
          locations[0].latitude =
            ridingDetails.routeDetails.originInfo.position.lat;
          locations[0].longitude =
            ridingDetails.routeDetails.originInfo.position.lng;
          locations[0].other_info.formatted_address =
            ridingDetails.routeDetails.originInfo.formattedAddress;
        }

        let _data = data;
        _data.title = 'Sunday';
        _data.description = 'sunday sunday';
        _data.total_distance = '5.0555';
        _data.locations = locations;
        setData(_data);

        // createRouteObjectPara(ridingDetails);
        dispatch(CreateRoute(data)).then((res) => {
          if (res.success) {
            setResult({Result: res.result});
            // setStopWatchTimeStart(true);
            dispatch(setRideStatus(1));
            toggleStopwatch(true);
          }
        });
      } else if (screenCheck === REPAIR_RENTALS) {
        let _rentalLoc = [];
        if (locations.length < 2) {
          _rentalLoc[0].latitude =
            ridingDetails.routeDetails.originInfo.position.lat;
          _rentalLoc[0].longitude =
            ridingDetails.routeDetails.originInfo.position.lng;
          _rentalLoc[0].other_info.formatted_address =
            ridingDetails.formattedAddress;
          _rentalLoc[1] = locations;
          locations.shift();
          locations = _rentalLoc;
        }
        let _data = data;
        _data.title = 'Sunday';
        _data.description = 'sunday sunday';
        _data.total_distance = '5.0555';
        _data.locations = _rentalLoc.length > 0 ? _rentalLoc : locations;
        setData(_data);
        dispatch(CreateRoute(data)).then((res) => {
          if (res.success) {
            setResult({Result: res.result});
            // setStopWatchTimeStart(true);
            dispatch(setRideStatus(1));
            toggleStopwatch(true);
          }
        });
      } else {
        // setStopWatchTimeStart(true);
        toggleStopwatch(true);
        dispatch(setRideStatus(1));
      }
      // console.log(res1);
    });
  };

  const onPressContinue = () => {
    setCanCallFetchLiveLocationFlag(true);
    setStopWatchTimeStart(true);
    dispatch(setRideStatus(1));
    toggleStopwatch(true);
  };

  const onPressPause = () => {
    setStopWatchTimeStart(false);
    dispatch(setRideStatus(2));
    toggleStopwatch(false);
    setCanCallFetchLiveLocationFlag(false);
  };

  const onPressStop = () => {
    setFinishButtonFlag(true);
    setCanCallFetchLiveLocationFlag(false);
    let time = stopWatchTime.split(':');
    let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
    let mtoH = (parseFloat(distanceTravelled) * 3600) / seconds;
    setSpeed(mtoH);
    dispatch(setRideStatus(3));
    resetStopwatch();
  };

  const onPressFavourite = () => {
    let _toggle = !toggleFav;
    dispatch(setFavouriteRides(_toggle, result.Result.route_id))
      .then((res) => {
        setToggleFev(_toggle);
        if (res?.data.is_favorite === true) {
          alert('Your Route is added into Favourite List');
        } else {
          alert('Your Route is removed from the Favourite List ');
        }
      })
      .catch((e) => {
        setToggleFev(toggleFav);
      });
  };

  const onPressShare = () => {
    viewRef?.current?.capture().then((uri) => {
      const shareOptions = {
        title: 'Share Route',
        failOnCancel: false,
        urls: [uri],
      };
      try {
        Share.open(shareOptions)
          .then((res) => {
            console.log('Share Route', res);
          })
          .catch((err) => {
            console.log('Share Route error', err);
          });
      } catch (e) {
        console.log('Share Route error1', e);
      }
    });
  };

  const onPressFinish = async () => {
    setFinishButtonFlag(false);
    setCanCallFetchLiveLocationFlag(true);
    if (screenCheck === GROUP_RIDE) {
      leaveGroupRideSocket({
        auth_token: authToken,
        group_id: groupData[0].group_id,
      });
    }
    if (screenCheck !== SOLO_RIDE && screenCheck !== GROUP_RIDE) {
      dispatch(
        setRidingDetails(
          {
            status: 0,
            rideType: 0,
            routeDetails: {
              rideRoute: [],
              distanceInfo: {},
            },
            favourite: false,
          },
          true,
        ),
      );
      let time = stopWatchTime.split(':');
      let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];

      let _route_id = result.Result.route_id;
      let _distance = distanceTravelled === 0 ? 1 : distanceTravelled;
      let _speed = userSpeed;
      let _calories = 1200;
      let _points = 100;
      let _locationDetails = locationDetailedResult;
      _locationDetails.route_id = _route_id;
      _locationDetails.distance = _distance;
      _locationDetails.speed = _speed === 0 ? 1 : _speed;
      _locationDetails.time = seconds;
      _locationDetails.calories = _calories;
      _locationDetails.points = _points;
      setLocationDetailedResult(_locationDetails);

      dispatch(CreateActivity(locationDetailedResult)).then((res) => {
        if (res.success) {
          dispatch(setRideStatus(0));
        }
      });

      // dispatch(setRideStatus(0));
    } else {
      getFinishRideLocation().then((res) => {
        let _originSequence = 2;
        let _originTitle =
          ridingDetails?.routeDetails?.originInfo?.streetName ?? '';
        let _originPlaceID = '';

        let _originLatitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lat ?? 0;
        let _originLongitude =
          ridingDetails?.routeDetails?.originInfo?.position?.lng ?? 0;
        let _originFormattedAddress =
          ridingDetails?.routeDetails?.originInfo?.formattedAddress ?? '';
        let _arrQuickCurrentLocation = arrQuickCurrentLocation;
        _arrQuickCurrentLocation.push({
          title: _originTitle,
          place_id: _originPlaceID,
          latitude: _originLatitude,
          longitude: _originLongitude,
          sequence: _originSequence,
          other_info: {formatted_address: _originFormattedAddress},
        });
        setArrQuickCurrentLocation(_arrQuickCurrentLocation);

        let _data = data;
        _data.title = 'Sunday';
        _data.description = 'sunday sunday';
        _data.total_distance = '5.0555';
        _data.locations = arrQuickCurrentLocation;
        setData(_data);

        // createRouteObjectPara(ridingDetails);
        dispatch(CreateRoute(data)).then((res) => {
          if (res.success) {
            setResult({Result: res.result});
            let time = stopWatchTime.split(':');
            let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];

            let _route_id = res.result.route_id;
            let _distance = distanceTravelled === 0 ? 1 : distanceTravelled;
            let _speed = userSpeed;
            let _calories = 1200;
            let _points = 100;
            let _locationDetails = locationDetailedResult;
            _locationDetails.route_id = _route_id;
            _locationDetails.distance = _distance;
            _locationDetails.speed = _speed === 0 ? 1 : _speed;
            _locationDetails.time = seconds;
            _locationDetails.calories = _calories;
            _locationDetails.points = _points;
            setLocationDetailedResult(_locationDetails);

            dispatch(CreateActivity(locationDetailedResult)).then((res) => {
              if (res.success) {
                dispatch(setRideStatus(0));
              }
            });
            toggleStopwatch(false);
          }
        });
      });
    }
    dispatch(
      setBottomTabMiddleButtonInfo({
        label: 'Connect',
        visible: true,
      }),
    );
    setFinishButtonFlag(false);
    setCalories(0);
    setPrevLatLng({latitude: 0, longitude: 0});
    latLangValues.prevLatLng.latitude = 0;
    latLangValues.prevLatLng.longitude = 0;
    totalCoveredDistace = 0;
    setDistanceTravelled(0);
    setUserSpeed(0);
    navigation.dispatch(StackActions.replace('Home'));
  };
  const calcDistance = (newLatLng) => {
    if (
      latLangValues.prevLatLng.longitude === 0 &&
      latLangValues.prevLatLng.latitude === 0
    ) {
      return 0;
    } else {
      const R = 6371e3; // metres
      const φ1 = (latLangValues.prevLatLng.latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (newLatLng.latitude * Math.PI) / 180;
      const Δφ =
        ((newLatLng.latitude - latLangValues.prevLatLng.latitude) * Math.PI) /
        180;
      const Δλ =
        ((newLatLng.longitude - latLangValues.prevLatLng.longitude) * Math.PI) /
        180;
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceInMeter = R * c; // in metres
      const distaneInMiles =
        distanceInMeter > 0 ? distanceInMeter / 1609.344 : 0;
      return distaneInMiles > 0 ? distaneInMiles : 0;
    }
  };
  const fetchLiveLocation = () => {
    watchID = Geolocation.watchPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setAngle(position.coords.heading);
        if (screenCheck === GROUP_RIDE) {
          await sendLiveLocationSocket({
            auth_token: authToken,
            group_id: groupData[0].group_id,
            location_data: newCoordinate,
          });
          await groupLiveLocationSocket(async (data) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            await setGroupRideUserDetails(data);
          });
        }

        coordinate.timing(newCoordinate).start();
        let routeCo = routeCords;
        routeCo.concat([newCoordinate]);
        setRouteCords(routeCo);
        setUserSpeed(position.coords.speed);

        let _distanceTravelled = distanceTravelled;

        let _tempCalculateDistance = await calcDistance(newCoordinate);
        _tempCalculateDistance =
          _tempCalculateDistance > 0
            ? _distanceTravelled + _tempCalculateDistance
            : _distanceTravelled;
        setDistanceTravelled(_tempCalculateDistance);

        let distanceTravel = distanceTravelled;
        let _calories = distanceTravel * 100;
        setCalories(_calories);
        latLangValues.prevLatLng.latitude = newCoordinate.latitude;
        latLangValues.prevLatLng.longitude = newCoordinate.longitude;
        setPrevLatLng(newCoordinate);
        status < 1
          ? setInitialRegions({
              ...initialRegions,
              ...newCoordinate,
            })
          : setUpdatedRegion({
              ...updatedRegion,
              ...newCoordinate,
            });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
        useNativeDriver: true,
      },
    );
  };

  const getSpeed = () => {
    if (userSpeed > 0) {
      let time = stopWatchTime !== 0 ? stopWatchTime.split(':') : '00:00:00';
      let seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
      console.log('seconds', seconds);
      if (isNaN(seconds)) {
        seconds = 1;
      }
      let mtoH = parseFloat(distanceTravelled) * (3600 / seconds);
      mtoH = mtoH.toString().substring(0, 4);
      return mtoH;
      // return 1;
    } else {
      return 0;
    }
  };

  const renderBottomSheet = () => (
    <SwappableBottomPopUp
      containerStyle={{
        bottom: insets.bottom > 0 ? hp(-65) + insets.bottom : hp(-67),
      }}
      expandHeight={39}>
      {status === 1 ? (
        <View style={[styles.sheetUpperView, isANDROID && {height: 40}]}>
          <View>
            <Text style={styles.blackTitleText}>{`${measurementConversion(
              parseFloat(distanceTravelled),
              isMetric,
            )} ${isMetric ? 'miles' : 'km'}`}</Text>
            <Text style={styles.greyValueText}>{'Distance'}</Text>
          </View>
          <View>
            <Text style={styles.blackTitleText}>
              {userSpeed > 0
                ? `${convertMphToKph(parseFloat(getSpeed()), isMetric)} ${
                    isMetric ? ' mph' : ' kph'
                  } `
                : `${isMetric ? '0 mph' : '0 kph'} `}
            </Text>

            <Text style={styles.greyValueText}>{'Speed'}</Text>
          </View>
          <AppButton
            onPress={onPressPause}
            isRounded={false}
            label={'Pause'}
            btnStyle={styles.pauseButton}
            labelStyle={{
              fontFamily: fonts.Lato_Bold,
              fontSize: normalize(12),
            }}
          />
        </View>
      ) : (
        <View style={[styles.sheetUpperView, isANDROID && {height: 40}]}>
          <AppButton
            onPress={onPressContinue}
            isRounded={false}
            label={'Continue'}
            btnStyle={styles.statusButton}
            labelStyle={{
              fontFamily: fonts.Lato_Bold,
              fontSize: normalize(16),
            }}
          />
          <AppButton
            onPress={onPressStop}
            isRounded={false}
            label={'Stop'}
            btnStyle={[styles.statusButton, {backgroundColor: color.orange}]}
            labelStyle={{
              fontFamily: fonts.Lato_Bold,
              fontSize: normalize(16),
            }}
          />
        </View>
      )}
      <View style={styles.sheetLowerView}>
        <View>
          <Text style={styles.blackTitleText}>
            {calories > 0 ? parseFloat(calories).toFixed(2) : '0'}
          </Text>
          <Text style={styles.greyValueText}>{'Calories'}</Text>
        </View>
        {/*  <View>
          <Text style={styles.blackTitleText}>{'1,247'}</Text>
          <Text style={styles.greyValueText}>{'Points'}</Text>
        </View>*/}
      </View>
      <View style={[styles.topBottomBorderContainer, styles.musicContainer]}>
        <Image
          source={{
            uri:
              'https://images-eu.ssl-images-amazon.com/images/I/31B2Nyzd8XL.png',
          }}
          style={styles.musicImage}
        />
        <View style={{width: wp(38)}}>
          <Text style={styles.musicServiceTitle}>
            {'Now playing on: Spotify'}
          </Text>
          <Text style={styles.musicName}>{'After Hours'}</Text>
          <Text style={styles.musicDetails}>{'The Weeknd'}</Text>
        </View>
        <View style={styles.musicControlsContainer}>
          <FontAwesome name={'pause'} color={color.black_33} size={hp(3.2)} />
          <Ionicons
            name={'play-forward-sharp'}
            color={color.black_33}
            size={hp(3.5)}
          />
        </View>
      </View>
    </SwappableBottomPopUp>
  );

  const renderUpperBoxDetails = () => (
    <SafeAreaView style={styles.upperBoxSafeArea}>
      {status < 1 && (
        <TouchableOpacity
          style={{
            left: wp(5),
            width: wp(5),
            zIndex: 100,
            top: isANDROID ? hp(2.5) : hp(2),
          }}
          onPress={async () => {
            if (screenCheck === GROUP_RIDE) {
              await leaveGroupRideSocket({
                auth_token: authToken,
                group_id: groupData[0].group_id,
              });
              tempGroupRideUsers = [];
            }
            dispatch(
              setBottomTabMiddleButtonInfo({
                label: 'Connect',
                visible: true,
              }),
            );
            navigation.dispatch(StackActions.replace('Home'));
          }}>
          <MaterialIcons
            name={'arrow-back-ios'}
            color={color.sky}
            size={hp(2.5)}
          />
        </TouchableOpacity>
      )}
      <View style={styles.upperBoxHeadingContainer}>
        <Text
          style={[
            styles.distanceText,
            status > 0 &&
              status < 3 && {fontSize: normalize(80), marginTop: hp(7)},
            status === 3 && {fontSize: normalize(40), marginTop: hp(7)},
          ]}>
          {status === 0 || status === 3 ? (
            !finishButtonFlag ? (
              `${measurementConversion(distanceValue, isMetric)} ${
                isMetric ? 'miles' : 'km'
              }`
            ) : (
              `${measurementConversion(
                parseFloat(distanceTravelled),
                isMetric,
              )} ${isMetric ? 'miles' : 'km'}`
            )
          ) : (
            <StopWatch
              stopWatchTimeStart={stopWatchTimeStart}
              stopWatchTimeReset={stopWatchTimeReset}
              setStopWatchTime={setStopWatchTime}
              disabled={!stopWatchTimeReset && !stopWatchTimeStart}
            />
          )}
        </Text>
        {status === 3 &&
          screenCheck !== SOLO_RIDE &&
          screenCheck !== GROUP_RIDE &&
          screenCheck !== REPAIR_RENTALS && (
            <TouchableOpacity
              onPress={onPressFavourite}
              activeOpacity={1}
              style={{
                position: 'absolute',
                right: wp(6),
                top: hp(isIOS ? 7.5 : 8.5),
              }}>
              <MaterialCommunityIcons
                name={toggleFav ? 'star-circle' : 'star-circle-outline'}
                color={color.sky}
                size={hp(4.8)}
              />
            </TouchableOpacity>
          )}
      </View>
      <Text
        style={[
          styles.distanceLabel,
          status === 3 && {fontSize: normalize(12)},
        ]}>
        {status > 0 && status < 3
          ? 'Time'
          : status === 0
          ? 'Distance'
          : 'Total Distance'}
      </Text>
      {status === 3 && (
        <View
          style={[
            styles.topBottomBorderContainer,
            styles.rideBoxDetailsContainer,
          ]}>
          <View>
            <Text style={[styles.blackTitleText, styles.rideBoxBlackText]}>
              {speed > 0
                ? `${convertMphToKph(parseFloat(speed), isMetric)} ${
                    isMetric ? ' mph' : ' kph'
                  } `
                : `${isMetric ? '0 mph' : '0 kph'} `}
            </Text>
            <Text style={styles.greyValueText}>{'Speed'}</Text>
          </View>
          <View>
            <Text style={[styles.blackTitleText, styles.rideBoxBlackText]}>
              {stopWatchTime}
            </Text>
            <Text style={styles.greyValueText}>{'Time'}</Text>
          </View>
          <View>
            <Text style={[styles.blackTitleText, styles.rideBoxBlackText]}>
              {calories > 0 ? parseFloat(calories).toFixed(2) : '0'}
            </Text>
            <Text style={styles.greyValueText}>{'Calories'}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
  const GRADIENT_VIEW = () => (
    <RNHoleView
      style={styles.holeView}
      holes={[
        {
          x: wp(10),
          y: hp(40),
          width: wp(80),
          height: wp(isIOS ? 85 : 80),
          borderRadius: 170,
        },
      ]}>
      <RadialGradient
        style={styles.gradientView}
        colors={['rgba(255, 255, 255 , 0)', color.white]}
        stops={[0.7, 1]}
        center={[wp(50), hp(60)]}
        radius={260}
      />
    </RNHoleView>
  );

  return (
    <View style={styles.container}>
      <ViewShot
        style={styles.mapStyle}
        ref={viewRef}
        options={{format: 'jpg', quality: 0.9}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          rotateEnabled={true}
          zoomEnabled={true}
          followsUserLocation={status > 0 && true}
          scrollEnabled={true}
          // initialRegion={status < 1 ? initialRegions : updatedRegion}
          region={status < 1 ? initialRegions : updatedRegion}>
          {cordsArray && cordsArray.length > 0 && screenCheck !== GROUP_RIDE && (
            <MapViewDirections
              origin={
                status < 1
                  ? initialRegions
                  : {
                      latitude: originInfo?.position?.lat ?? 0.0,
                      longitude: originInfo?.position?.lng ?? 0.0,
                    }
              }
              destination={
                routeInfo.cordsArray[
                  routeInfo &&
                    routeInfo.cordsArray &&
                    routeInfo.cordsArray.length - 1
                ]
              }
              strokeWidth={wp(1)}
              strokeColor={color.sky}
              apikey={GOOGLE_API_KEY}
              waypoints={routeInfo.cordsArray.filter(
                (i, index) =>
                  index !== routeInfo &&
                  routeInfo.cordsArray &&
                  routeInfo.cordsArray.length - 1,
              )}
            />
          )}
          {cordsArray &&
            cordsArray.length > 0 &&
            cordsArray.map((i, index) => (
              <Marker
                coordinate={i !== null || i !== undefined ? i : 0.0}
                key={index}>
                <DestinationMarker />
              </Marker>
            ))}
          {screenCheck === GROUP_RIDE &&
            groupRideUserDetails &&
            groupRideUserDetails.length > 0 &&
            groupRideUserDetails.map(
              (item, index) =>
                item.user.user_id !== user.user_id && (
                  <Marker
                    coordinate={
                      item !== null || item?.location_data !== undefined
                        ? {
                            latitude: parseFloat(
                              item?.location_data?.latitude ?? 0.0,
                            ),
                            longitude: parseFloat(
                              item?.location_data?.longitude ?? 0.0,
                            ),
                            latitudeDelta: parseFloat(
                              item?.location_data?.latitudeDelta ?? 0.0,
                            ),
                            longitudeDelta: parseFloat(
                              item?.location_data?.longitudeDelta ?? 0.0,
                            ),
                          }
                        : 0.0
                    }
                    key={index}>
                    <Image
                      source={{uri: item.user.profile_image}}
                      style={{width: hp(4), height: hp(4), borderRadius: hp(2)}}
                    />
                    <DestinationMarker />
                  </Marker>
                ),
            )}

          <MapView.Marker
            coordinate={status < 1 ? initialRegions : updatedRegion}>
            {screenCheck === GROUP_RIDE && (
              <Image
                source={{uri: user.profile_image}}
                style={{width: hp(4), height: hp(4), borderRadius: hp(2)}}
              />
            )}
            <CurrentMarker angle={angle} />
          </MapView.Marker>
        </MapView>
      </ViewShot>
      <GRADIENT_VIEW />
      {distanceValue !== null && renderUpperBoxDetails()}
      {status === 0 && (
        <CircularButton
          label={'Start'}
          viewStyle={[styles.absoluteButtonsView, styles.startButton]}
          onPress={onPressStart}
        />
      )}
      {status === 3 && (
        <View style={styles.afterRideButtonContainer}>
          <CircularButton
            label={'Share'}
            viewStyle={[
              styles.absoluteButtonsView,
              {backgroundColor: color.sky},
            ]}
            textStyle={{color: color.white}}
            onPress={onPressShare}
          />
          <CircularButton
            label={'Finish'}
            viewStyle={styles.absoluteButtonsView}
            onPress={onPressFinish}
          />
        </View>
      )}
      {status > 0 && status < 3 && renderBottomSheet()}
    </View>
  );
};

export default StartingRideScreen;
