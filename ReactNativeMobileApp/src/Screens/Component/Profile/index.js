import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from 'react-native';
import styles from './styles';
import {
  AppBorderButton,
  AppButton,
  AppHeader,
  ArrowButton,
  CustomProfileInputText,
  DefaultProfileImage,
  QrCodeView,
} from '../../Common';
import {
  color,
  fonts,
  hp,
  isIOS,
  normalize,
  wp,
} from '../../../Helper/themeHelper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ShowMoreButton} from '../../Common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {toHHMMSS} from '../../../Helper/validation';
import {Features} from './data';
import {EditUserData} from '../../../Redux/Actions/AuthAction';
import {openImagePicker} from '../../../Helper/imageUpload';
import {setBottomTabVisibility} from '../../../Redux/Actions/SystemAction';
import FastImage from 'react-native-fast-image';
import {
  GOOGLE_API_KEY,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../../../Helper/appHelper';
import MapViewDirections from 'react-native-maps-directions';
import {CurrentMarker, DestinationMarker} from '../../Common/AppMarkers';
import RadialGradient from 'react-native-radial-gradient';
import {RNHoleView} from 'react-native-hole-view';
const RANDOM_PASSWORD = '#########';
const DEFAULT_PROFILE_PIC = 'DEFAULT_PROFILE_PIC';

const Profile = ({navigation}) => {
  let user = useSelector((state) => state.user.userDetail);
  let authToken = useSelector((state) => state.user.authToken);
  const dispatch = useDispatch();
  const [isLoading, toggleLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.user_name,
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    homeAddress: user?.home_address ?? '',
    workAddress: user?.work_address ?? '',
    profile_image: user?.profile_image ?? DEFAULT_PROFILE_PIC,
  });

  const [isMore, setIsMore] = useState(false);

  const [userState, setUserState] = useState({
    username: user?.user_name,
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    homeAddress: user?.home_address ?? '',
    workAddress: user?.work_address ?? '',
    profile_image: user?.profile_image ?? DEFAULT_PROFILE_PIC,
  });

  const {
    email,
    phone,
    homeAddress,
    workAddress,
    profile_image,
    username,
  } = userState;

  const [password, setPassword] = useState(RANDOM_PASSWORD);
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const [showPassword, toggleShowPassword] = useState(false);
  const [showNewPassword, toggleShowNewPassword] = useState(false);
  const [showCPassword, toggleShowCPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
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
  const scrollRef = useRef(null);

  const recent_ride = useSelector((state) => state?.profile?.recentRide ?? []);

  const {route_locations} = recent_ride?.route ?? [];

  useEffect(() => {
    setUserState({...userData});
    let data = {
      username: user?.user_name,
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      homeAddress: user?.home_address ?? '',
      workAddress: user?.work_address ?? '',
      profile_image: user?.profile_image ?? DEFAULT_PROFILE_PIC,
    };
    setTimeout(() => setUserState({...data}), 100);
    setUserData({...data});
    // dispatch(FetchRecentRide()).then((res) => {
    //
    //   if (res.success) {

    for (let i = 0; i < recent_ride?.route?.route_locations.length; i++) {
      let _coords = coordinatesArray;

      if (i === 0) {
        _coords[0].originCoord.latitude = parseFloat(
          recent_ride?.route?.route_locations[i].location.latitude ?? 0,
        );
        _coords[0].originCoord.longitude = parseFloat(
          recent_ride?.route?.route_locations[i].location.longitude ?? 0,
        );
        // _coords.originCoord.push(recent_ride?.route?.route_locations[i].longitude);
      } else {
        _coords[0].destinationCoord.latitude = parseFloat(
          recent_ride?.route?.route_locations[i].location.latitude ?? 0,
        );
        _coords[0].destinationCoord.longitude = parseFloat(
          recent_ride?.route?.route_locations[i].location.longitude ?? 0,
        );
      }
      setCoordinatesArray(_coords);
    }
    // _coords = res?.result?.route?.route_locations;

    // let _coordinatesArray =res?.result?.route?.route_locations?? [];
    // setCoordinatesArray(_coordinatesArray);

    // setRouteInfo()
    //   }
    // });
  }, [user]);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const GRADIENT_VIEW = () => (
    <RNHoleView
      style={styles.holeView}
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
        style={styles.gradientView}
        colors={['rgba(255, 255, 255 , 0)', 'rgba(255, 255, 255 , 0.6)']}
        stops={[0.8, 1]}
        center={[wp(55), hp(15)]}
        radius={wp(40)}
      />
    </RNHoleView>
  );

  const handleBackButtonClick = () => {
    dispatch(setBottomTabVisibility(true));
    setIsEditable(false);
    setPassword(RANDOM_PASSWORD);
    setNewPassword('');
    setCPassword('');
    setUserState(userData);
    toggleShowCPassword(false);
    toggleShowNewPassword(false);
    toggleShowPassword(false);
    navigation.goBack();
    return true;
  };
  const updateUserState = (key, value) =>
    setUserState({...userState, [key]: value});

  const isUserDataUpdated = () => {
    console.log(
      JSON.stringify(userState) !== JSON.stringify(userData) ||
        password !== '' ||
        newPassword !== '',
    );
    return (
      JSON.stringify(userState) !== JSON.stringify(userData) ||
      password !== '' ||
      newPassword !== ''
    );
  };

  const onSave = () => {
    let isNumHomeAdd = /^\d+$/.test(homeAddress);
    let isNumWorkAdd = /^\d+$/.test(workAddress);
    if (username === '') {
      alert('Please fill user name field');
    } else if (phone === '') {
      alert('Please fill phone number field');
    } else if (
      user?.login_type === 'email' &&
      password !== '' &&
      (newPassword === '' || cPassword === '')
    ) {
      let alertText =
        newPassword === ''
          ? 'Please enter new password'
          : 'Please enter confirm new password';
      alert(alertText);
    } else if (
      user?.login_type === 'email' &&
      password === '' &&
      (newPassword !== '' || cPassword !== '')
    ) {
      alert('Please enter current password');
    } else if (user?.login_type === 'email' && newPassword !== cPassword) {
      alert('Passwords are not matched!');
    } else if (isNumHomeAdd) {
      alert('Please Enter Valid Home Address');
    } else if (isNumWorkAdd) {
      alert('Please Enter Valid Work Address');
    } else {
      const passwordObj =
        password !== '' && newPassword !== '' && cPassword !== ''
          ? {
              current_password: password,
              new_password: newPassword,
              confirm_password: cPassword,
              is_password_updating: true,
            }
          : {};
      toggleLoading(true);
      dispatch(
        EditUserData({
          phone: userState.phone,
          user_name: userState.username,
          profile_image: userState.profile_image,
          home_address: userState.homeAddress,
          work_address: userState.workAddress,
          ...passwordObj,
        }),
      )
        .then((res) => {
          toggleLoading(false);
          if (res) {
            toggleEditMode();
            alert('Details are updated');
          }
        })
        .catch((e) => toggleLoading(false));
    }
  };

  const renderProFeatures = () => {
    let comp = [];
    for (let i = 0; i < Features.length; i++) {
      comp.push(
        <View style={styles.proFeatureContainer}>
          <MaterialCommunityIcons
            name={'check'}
            color={color.white}
            size={hp(3)}
          />
          <Text style={styles.proFeatureText}>{Features[i].featureTitle}</Text>
        </View>,
      );
    }
    return comp;
  };

  const renderBasicFeatures = () => {
    let comp = [];
    for (let i = 0; i < Features.length; i++) {
      let sym = 'check';
      let col = color.sky;
      if (!Features[i].basic) {
        sym = 'close';
        col = color.gray;
      }
      comp.push(
        <View style={styles.basicFeatureContainer}>
          <MaterialCommunityIcons name={sym} color={col} size={hp(3)} />
          <Text style={styles.basicFeatureText}>Something about this plan</Text>
        </View>,
      );
    }
    return comp;
  };

  const toggleEditMode = () => {
    if (isEditable) {
      dispatch(setBottomTabVisibility(true));
      setIsEditable(false);
      setPassword(RANDOM_PASSWORD);
      setNewPassword('');
      setCPassword('');
      setUserState(userData);
      toggleShowCPassword(false);
      toggleShowNewPassword(false);
      toggleShowPassword(false);
    } else {
      setPassword('');
      dispatch(setBottomTabVisibility(false));
      setIsEditable(true);
    }
    if (isMore) {
      setIsMore(!isMore);
    }
    scrollRef?.current?.scrollTo({x: 0, y: 0, animated: false});
  };

  const changeProfilePic = () => {
    openImagePicker().then((image) => {
      updateUserState('profile_image', image);
    });
  };

  const headerRightComponent = () => {
    return (
      <TouchableOpacity onPress={toggleEditMode}>
        {isEditable ? (
          <Text style={styles.editButton}>Close</Text>
        ) : (
          <Text style={styles.editButton}>Edit</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        isSetting={true}
        navigation={navigation}
        HeaderText={'Profile'}
        rightComponent={headerRightComponent()}
        containerStyle={{backgroundColor: color.lightest_gray}}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={isIOS ? 'height' : 'padding'}
        keyboardVerticalOffset={isIOS ? -hp(8) : -hp(40)}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{paddingBottom: hp(10)}}
          style={{
            flex: 1,
            backgroundColor: color.light_background,
          }}>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity
              disabled={!isEditable}
              style={styles.profileImage}
              onPress={changeProfilePic}>
              {userState?.profile_image === DEFAULT_PROFILE_PIC ? (
                <DefaultProfileImage
                  name={user?.short_name}
                  style={{flex: 1}}
                  labelStyle={{fontSize: normalize(50)}}
                />
              ) : typeof profile_image === 'object' && profile_image?.uri ? (
                <Image
                  source={{uri: profile_image.uri}}
                  resizeMode={'contain'}
                  style={{flex: 1}}
                />
              ) : (
                <FastImage
                  source={{
                    uri:
                      (typeof userState?.profile_image === 'object' &&
                        userState?.profile_image?.uri) ||
                      userState?.profile_image,
                    headers: {Authorization: authToken},
                    priority: FastImage.priority.low,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{flex: 1}}
                />
              )}
            </TouchableOpacity>
          </View>
          {isEditable || (
            <View style={styles.infoContainer}>
              <Text style={styles.userNameText}>USER NAME</Text>
              <Text
                style={[
                  styles.progressBarText,
                  {
                    fontSize: normalize(14),
                  },
                ]}>
                {userData?.username}
              </Text>
              <QrCodeView />
            </View>
          )}
          {isEditable || (
            <>
              {/*........Sample Map For Spacing Idea........*/}
              {route_locations !== undefined &&
                route_locations !== null &&
                route_locations?.length > 0 && (
                  <View style={styles.mapContainer}>
                    <AppBorderButton
                      label={'Recent Ride'}
                      btnStyle={styles.btnRecentRide}
                      labelStyle={styles.btnRecentRideText}
                      disabled={true}
                    />
                    <View style={styles.textMapContainer}>
                      <Text style={styles.textTitle}>Highest Speed</Text>
                      <Text style={styles.textValue}>
                        {parseFloat(recent_ride.speed).toFixed(2)}
                      </Text>
                      <Text style={[styles.textTitle, {marginTop: hp(2)}]}>
                        Best time:
                      </Text>
                      <Text style={styles.textValue}>
                        {toHHMMSS(recent_ride.time)}
                      </Text>
                    </View>
                    {/*<MapView style={styles.mapStyle} />*/}
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.mapStyle}
                      region={{
                        latitude: parseFloat(
                          route_locations[0].location.latitude,
                        ),
                        longitude: parseFloat(
                          route_locations[0].location.longitude,
                        ),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      initialRegion={{
                        latitude: parseFloat(
                          route_locations[0].location.latitude,
                        ),
                        longitude: parseFloat(
                          route_locations[0].location.longitude,
                        ),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}>
                      {/*{route_locations && route_locations.length > 0 && (*/}
                      <MapViewDirections
                        origin={{
                          latitude: parseFloat(
                            route_locations[0].location.latitude,
                          ),
                          longitude: parseFloat(
                            route_locations[0].location.longitude,
                          ),
                        }}
                        destination={{
                          latitude: parseFloat(
                            route_locations[route_locations.length - 1].location
                              .latitude,
                          ),
                          longitude: parseFloat(
                            route_locations[route_locations.length - 1].location
                              .longitude,
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
                          latitude: parseFloat(
                            route_locations[0].location.latitude,
                          ),
                          longitude: parseFloat(
                            route_locations[0].location.longitude,
                          ),
                        }}>
                        <CurrentMarker />
                      </Marker.Animated>
                    </MapView>

                    <GRADIENT_VIEW />
                  </View>
                )}
              <View style={{flex: 1}}>
                <View style={styles.progressBarContainer}>
                  <View>
                    <View style={styles.tryProAccountContainer}>
                      <Text style={styles.tryProText1}>Try Pro Account</Text>
                      <Text style={styles.tryProText2}>
                        for unlimited calls
                      </Text>
                    </View>
                    <Text style={styles.progressBarText}>
                      50% of free calls used
                    </Text>
                  </View>
                  <ShowMoreButton
                    onPress={() => {
                      setIsMore(!isMore);
                    }}
                    name={isMore ? 'chevron-up' : 'chevron-down'}
                  />
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={{
                      backgroundColor: color.sky,
                      width: wp(88) * 0.5,
                      borderRadius: 5,
                    }}
                  />
                </View>
                {isMore ? (
                  <>
                    <View style={styles.moreContainer}>
                      <Text style={styles.moreText}>
                        45 of 90 minutes (50%) used
                      </Text>
                    </View>
                    <View style={styles.PurchaseMinutesContainer}>
                      <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.tryProText1}>Purchase Minutes</Text>
                      </TouchableOpacity>
                      <Text style={styles.tryProText2}>for more calls</Text>
                    </View>
                  </>
                ) : (
                  <View />
                )}
              </View>
            </>
          )}
          {isMore && (
            <View style={styles.dropdownContainer}>
              <View style={styles.basicContainer}>
                <Text
                  style={[styles.progressBarText, {fontSize: normalize(14)}]}>
                  Olie Basic
                </Text>
                <Text style={styles.basicSubTitle}>Free</Text>
                <AppBorderButton
                  label={'Current Plan'}
                  btnStyle={styles.basicButton}
                  labelStyle={styles.basicButtonText}
                  disabled={true}
                />
                {renderBasicFeatures()}
              </View>
              <View style={styles.proContainer}>
                <Text style={styles.proTitle}>Olie Pro Unlimited</Text>
                <Text style={styles.proSubTitle}>£9,90/month</Text>
                <AppButton
                  label={'Try Pro Unlimited'}
                  btnStyle={styles.proButton}
                  labelStyle={{fontFamily: fonts.Lato_Regular}}
                  disabled={true}
                />
                {renderProFeatures()}
              </View>
            </View>
          )}
          <View style={{marginTop: hp(3), flex: 1, paddingHorizontal: wp(8)}}>
            <CustomProfileInputText
              title={'E-MAIL'}
              value={email}
              editable={false}
              onChangeText={
                isEditable ? (text) => updateUserState('email', text) : null
              }
              viewStyle={styles.inputContainer}
            />
            {isEditable && (
              <CustomProfileInputText
                title={'USER NAME'}
                value={username}
                editable={isEditable}
                onChangeText={
                  isEditable
                    ? (text) => updateUserState('username', text)
                    : null
                }
                viewStyle={styles.inputContainer}
              />
            )}
            {user?.login_type === 'email' && (
              <CustomProfileInputText
                title={isEditable ? 'CURRENT PASSWORD' : 'PASSWORD'}
                value={password}
                onChangeText={isEditable ? (text) => setPassword(text) : null}
                viewStyle={styles.inputContainer}
                secureTextEntry={!showPassword}
                editable={isEditable}
                containerStyle={[showPassword || {borderColor: color.gray}]}
                rightComponent={
                  isEditable ? (
                    <TouchableOpacity
                      onPress={() => toggleShowPassword(!showPassword)}>
                      <FontAwesome5
                        name={showPassword ? 'eye' : 'eye-slash'}
                        color={color.gray}
                        size={hp(2)}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )
                }
              />
            )}
            {isEditable && user?.login_type === 'email' ? (
              <CustomProfileInputText
                title={'NEW PASSWORD'}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                viewStyle={styles.inputContainer}
                secureTextEntry={!showNewPassword}
                editable={isEditable}
                containerStyle={[showNewPassword || {borderColor: color.gray}]}
                rightComponent={
                  isEditable ? (
                    <TouchableOpacity
                      onPress={() => toggleShowNewPassword(!showNewPassword)}>
                      <FontAwesome5
                        name={showNewPassword ? 'eye' : 'eye-slash'}
                        color={color.gray}
                        size={hp(2)}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )
                }
              />
            ) : (
              <View />
            )}
            {user?.login_type === 'email' && isEditable ? (
              <CustomProfileInputText
                title={'CONFIRM NEW PASSWORD'}
                value={cPassword}
                onChangeText={(text) => setCPassword(text)}
                viewStyle={styles.inputContainer}
                secureTextEntry={!showCPassword}
                blurOnSubmit={false}
                onSubmitEditing={() => Keyboard.dismiss()}
                containerStyle={[showCPassword || {borderColor: color.gray}]}
                rightComponent={
                  <TouchableOpacity
                    onPress={() => toggleShowCPassword(!showCPassword)}>
                    <FontAwesome5
                      name={showCPassword ? 'eye' : 'eye-slash'}
                      color={color.gray}
                      size={hp(2)}
                    />
                  </TouchableOpacity>
                }
              />
            ) : (
              <View />
            )}
            <CustomProfileInputText
              title={'Phone Number'.toUpperCase()}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={
                isEditable ? (text) => updateUserState('phone', text) : null
              }
              viewStyle={styles.inputContainer}
              editable={isEditable}
            />
            <CustomProfileInputText
              title={'Home'.toUpperCase()}
              value={homeAddress}
              onChangeText={
                isEditable
                  ? (text) => updateUserState('homeAddress', text)
                  : null
              }
              keyboardType="ascii-capable"
              viewStyle={styles.inputContainer}
              editable={isEditable}
            />
            <CustomProfileInputText
              title={'Work'.toUpperCase()}
              value={workAddress}
              onChangeText={
                isEditable
                  ? (text) => updateUserState('workAddress', text)
                  : null
              }
              keyboardType="ascii-capable"
              viewStyle={styles.inputContainer}
              editable={isEditable}
            />

            {isEditable ? (
              <AppButton
                isLoading={isLoading}
                label={'Save Changes'}
                onPress={onSave}
                btnStyle={[
                  styles.saveBtn,
                  isUserDataUpdated() || {
                    backgroundColor: color.gray,
                  },
                ]}
                disabled={!isUserDataUpdated()}
              />
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Profile;
