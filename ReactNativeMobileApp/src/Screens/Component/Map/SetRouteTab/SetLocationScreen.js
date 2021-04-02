import React, {useState, createRef, useEffect} from 'react';
import {
  color,
  fonts,
  hp,
  isANDROID,
  isIOS,
  normalize,
  wp,
} from '../../../../Helper/themeHelper';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  clock,
  map_background,
  place_1,
  plus_icon,
  route_navigation,
  train,
} from '../../../Assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppButton} from '../../../Common';
import {useDispatch, useSelector} from 'react-redux';
import {
  setRecentLocations,
  setRideRoute,
  getPlacesFromText,
  FetchFavoriteRouteByUser,
  setRideStatus,
} from '../../../../Redux/Actions/NavigationAction';
import {ValueExist} from '../../../../Helper/appHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SetLocationScreen = ({visible = false, setVisible, navigation}) => {
  // ---------- Const ----------- //
  const recentLocation = useSelector(
    (state) => state?.navigation?.recentLocation ?? [],
  );
  const favouriteRides = useSelector(
    (state) => state?.navigation?.favouriteRides ?? [],
  );
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // ---------- State ----------- //
  let [destArray, setDestArray] = useState([{name: '', destRef: createRef()}]);
  let [places, setPlaces] = useState([]);
  let [currentDestBox, setCurrentDestBox] = useState(0);
  let [screen, setScreen] = useState(false);
  let [favoriteRouteDataArray, setFavoriteRouteDataArray] = useState([]);
  const [isKeyboardOpen, toggleKeyboard] = useState(false);
  const favouriteRoutesListData = useSelector(
    (state) => state?.navigation?.favouriteRoutesList ?? [],
  );

  // ---------- Config ----------- //
  useEffect(() => {
    fetchFavoriteRouteData();
    destArray &&
      destArray.length > 0 &&
      destArray[destArray.length - 1]?.destRef?.current?.focus();
  }, [destArray.length]);

  useEffect(() => {
    setFavoriteRouteDataArray(favouriteRoutesListData);
  }, [favouriteRoutesListData]);

  const fetchFavoriteRouteData = () => {
    dispatch(FetchFavoriteRouteByUser());
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  // ---------- Helpers ----------- //
  const resetScreenData = () => {
    setDestArray([{name: ''}]);
    setPlaces([]);
  };
  const _keyboardDidShow = () => {
    toggleKeyboard(true);
  };

  const _keyboardDidHide = () => {
    toggleKeyboard(false);
  };
  const getPlaces = async (text) => {
    await dispatch(getPlacesFromText(text))
      .then((response) => {
        setPlaces(response.results);
      })
      .catch((error) => console.log('API not working:', error));
  };

  const onPlacePress = (item) => {
    let arr = [...destArray];
    arr[currentDestBox] = {...arr[currentDestBox], ...item};
    setDestArray(arr);
    if (!ValueExist(recentLocation, 'place_id', item.place_id)) {
      let recentLoc = recentLocation;
      recentLoc.push(item);
      dispatch(setRecentLocations(recentLoc));
    }
  };

  const onPressBack = () => {
    if (screen) {
      setScreen(false);
      return;
    }
    resetScreenData();
    setVisible(false);
  };

  const onPressSetRoute = () => {
    if (destArray.filter((i) => i.place_id).length > 0) {
      dispatch(setRideRoute(destArray.filter((i) => i.place_id)));
      setVisible(false);
      dispatch(setRideStatus(0));
      navigation.replace('StartingRideScreen');
    } else {
      alert('Please select any location to ride');
    }
  };

  // ---------- Renders ----------- //
  const renderPlaces = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPlacePress(item)}
        style={styles.placeContainer}>
        <Image
          source={
            places?.length > 0 && destArray[currentDestBox]?.name !== ''
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

  const renderFavRoutes = ({item}) => {
    // let originsCollection = [];
    // let rideRouteArray = item.routeDetails.rideRoute;
    // let destObj = rideRouteArray[rideRouteArray.length - 1];
    // originsCollection.push(item.routeDetails.originInfo);
    // rideRouteArray.length > 1 &&
    // rideRouteArray.filter(
    //     (i, index) =>
    //         index !== rideRouteArray.length - 1 && originsCollection.push(i),
    // );

    const onPressStart = () => {
      resetScreenData();
      // dispatch(setRideRoute(rideRouteArray));
      // setVisible(false);
      // dispatch(setRideRoute(0));
      dispatch(setRideStatus(0));
      navigation.replace('StartingRideScreen', {
        screen: 'NavigationTab',
        selectedRoute: item?.route_locations,
        is_Favorite: item?.is_favorite,
      });
    };

    return (
      <View
        style={[
          styles.navigationRowContainer,
          {
            flexDirection: 'column',
          },
        ]}>
        <Text
          style={[
            styles.blackText,
            {color: color.black, alignSelf: 'flex-start'},
          ]}>
          {item.title}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: hp(0.8)}}>
          <Image
            source={route_navigation}
            style={{height: hp(6), width: wp(5)}}
            resizeMode={'contain'}
          />
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: wp(2),
              flex: 1,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.blackText, {fontSize: normalize(12)}]}>
              {item.route_locations[0].location.title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.blackText, {fontSize: normalize(12)}]}>
              {item.route_locations
                ? item.route_locations[item.route_locations.length - 1].location
                    .title
                : ''}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <AppButton
              isRounded={false}
              label={'Start'}
              btnStyle={styles.appBtn}
              onPress={onPressStart}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFavRoutesHeader = () => (
    <TouchableOpacity
      // onPress={() => setScreen(true)}
      onPress={() => setScreen(true)}
      style={[styles.favRouteContainer]}>
      <MaterialIcons name={'stars'} color={color.sky} size={hp(4)} />
      <View
        style={{
          left: wp(3),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: wp(82),
        }}>
        <Text style={styles.favRouteTitleText}>{'Favorites Routes'}</Text>
        <FontAwesome
          color={color.light_background}
          size={wp(8)}
          name={'angle-right'}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <ImageBackground
        imageStyle={{opacity: 0.35}}
        source={map_background}
        style={{flex: 1, top: insets.top > 0 ? insets.top : hp(1)}}>
        <View style={styles.historyModalHead}>
          <TouchableOpacity onPress={onPressBack}>
            <MaterialIcons
              name={'arrow-back-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <Text style={styles.modalHeadTitle}>{'Your location'}</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{top: hp(2)}}>
            {!screen &&
              destArray.map((i, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      left: wp(12),
                    }}>
                    <TextInput
                      ref={i.destRef}
                      style={styles.customText}
                      value={i.name}
                      onFocus={() => {
                        setCurrentDestBox(index);
                        toggleKeyboard(true);
                      }}
                      placeholder={'Where to?'}
                      placeholderColor={color.green}
                      onChangeText={(text) => {
                        let arr = [...destArray];
                        arr[index].name = text;
                        setDestArray(arr);
                        getPlaces(text);
                        setCurrentDestBox(index);
                      }}
                    />
                    {index === destArray.length - 1 ? (
                      destArray.length < 3 ? (
                        <TouchableOpacity
                          style={{left: wp(3)}}
                          onPress={() => {
                            let arr = [...destArray];
                            arr.push({
                              name: '',
                              destRef: createRef(),
                            });
                            setDestArray(arr);
                            setCurrentDestBox(index);
                          }}>
                          <Image
                            source={plus_icon}
                            style={{width: wp(5), height: wp(5)}}
                          />
                        </TouchableOpacity>
                      ) : null
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          let arr = [...destArray];
                          arr.splice(index, 1);
                          setDestArray(arr);
                        }}
                        style={{left: wp(3.5)}}>
                        <MaterialCommunityIcons
                          name={'close-circle'}
                          color={color.gray}
                          size={wp(5)}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
          </View>
          {screen ? (
            <FlatList
              data={favoriteRouteDataArray}
              style={{top: hp(4)}}
              contentContainerStyle={{paddingBottom: hp(12)}}
              renderItem={renderFavRoutes}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              // ListEmptyComponent={
              //   <Text style={styles.noRecordsText}>{'No records found'}</Text>
              // }
            />
          ) : (
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={isIOS ? 'height' : 'padding'}
              keyboardVerticalOffset={isIOS ? -hp(8) : -hp(40)}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                style={{top: hp(4)}}
                contentContainerStyle={{paddingBottom: hp(12)}}
                data={
                  places?.length > 0 && destArray[currentDestBox]?.name !== ''
                    ? places
                    : recentLocation
                }
                renderItem={renderPlaces}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderFavRoutesHeader}
              />
            </KeyboardAvoidingView>
          )}
          {!screen && !isKeyboardOpen && (
            <View
              style={{
                position: 'absolute',
                bottom: isANDROID ? 20 : 80,
                zIndex: 1000,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <AppButton
                // disabled={destArray.filter((i) => i.place_id).length <= 0}
                btnStyle={[
                  {width: wp(40), borderRadius: 7},
                  // destArray.filter((i) => i.place_id).length <= 0 && {
                  //   backgroundColor: color.gray,
                  //   shadowColor: color.gray,
                  // },
                ]}
                label={'Confirm Route'}
                onPress={onPressSetRoute}
                isRounded={false}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default SetLocationScreen;
