import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../Helper/themeHelper';
import {
  activity_disabled,
  activity_enabled,
  home_disabled,
  home_enabled,
  profile_disabled,
  profile_enabled,
  activityTab_disabled,
  activityTab_enabled,
} from '../Screens/Assets';
import Home from './homeNavigation';
import Map from '../Screens/Component/Map';
import ActivityTab from '../Screens/Component/Home/NewTab/ActivityModal';
import Profile from '../Screens/Component/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import {setBottomTabMiddleButtonInfo} from '../Redux/Actions/SystemAction';
import {FetchUserData} from '../Redux/Actions/AuthAction';
import {FetchRecentRide} from '../Redux/Actions/ProfileAction';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const dispatch = useDispatch();
  const [isTabbarVisible, toggleTabbar] = useState(true);
  const [isKeyboardOpen, toggleKeyboard] = useState(false);

  const bottomTabMiddleButtonInfo = useSelector(
    (state) => state?.system?.bottomTabMiddleButtonInfo,
  );

  const bottomTabVisibility = useSelector(
    (state) => state?.system?.bottomTabVisible,
  );
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    toggleKeyboard(true);
  };

  const _keyboardDidHide = () => {
    toggleKeyboard(false);
  };

  useEffect(() => {
    toggleTabbar(bottomTabVisibility);
  }, [bottomTabVisibility]);

  const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    keyboardHidesTabBar: true,
    style: {
      backgroundColor: color.white,
      borderTopLeftRadius: wp(8),
      borderTopRightRadius: wp(8),
      shadowOpacity: 0.8,
      shadowColor: color.gray,
      shadowRadius: 4,
      shadowOffset: {height: -2, width: 0},
      elevation: 2,
      borderColor: color.gray,
      borderTopWidth: isANDROID ? 1 : 0,
      borderWidth: isANDROID ? 1 : 0,
      position: 'absolute',
      height: hp(10),
    },
    tabStyle: {
      paddingTop: hp(2),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={customTabBarStyle}
      shifting="false">
      <Tab.Screen
        name="Home"
        options={{
          tabBarVisible: isTabbarVisible,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? home_enabled : home_disabled}
              style={{
                height: wp(12),
                width: wp(6),
              }}
            />
          ),
        }}
        component={Home}
        listeners={{
          tabPress: (e) => {
            dispatch(
              setBottomTabMiddleButtonInfo({
                label: 'Connect',
                visible: true,
              }),
            );
          },
        }}
      />
      <Tab.Screen
        name="ActivityTab"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? activityTab_enabled : activityTab_disabled}
              style={{
                height: focused ? wp(12) : wp(5),
                width: wp(6),
                bottom: focused ? 0 : 12,
              }}
              resizeMode={'contain'}
            />
          ),
        }}
        component={ActivityTab}
        listeners={{
          tabPress: (e) => {
            dispatch(
              setBottomTabMiddleButtonInfo({
                label: 'Connect',
                visible: true,
              }),
            );
          },
        }}
      />
      <Tab.Screen
        name="Connect"
        options={{
          tabBarLabel: '',
          tabBarButton: (props) =>
            isTabbarVisible &&
            !isKeyboardOpen &&
            bottomTabMiddleButtonInfo.visible ? (
              <TouchableOpacity
                activeOpacity={1}
                {...props}
                onPress={() =>
                  EventRegister.emit(bottomTabMiddleButtonInfo.label)
                }
                style={[
                  styles.middleButton,
                  {zIndex: 100},
                  // !bottomTabMiddleButtonInfo.visible && {bottom: wp(-5)},
                ]}>
                <Text style={styles.middleButtonText}>
                  {bottomTabMiddleButtonInfo.label}
                </Text>
              </TouchableOpacity>
            ) : null,
        }}
        component={Home}
        listeners={{
          tabPress: (e) => {
            dispatch(
              setBottomTabMiddleButtonInfo({
                label: 'Connect',
                visible: true,
              }),
            );
          },
        }}
      />
      <Tab.Screen
        name="Navigation"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? activity_enabled : activity_disabled}
              style={{
                height: wp(12),
                width: wp(6),
              }}
            />
          ),
        }}
        component={Map}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarVisible: isTabbarVisible,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? profile_enabled : profile_disabled}
              style={{
                height: wp(12),
                width: wp(6),
              }}
            />
          ),
        }}
        component={Profile}
        listeners={{
          tabPress: (e) => {
            dispatch(
              setBottomTabMiddleButtonInfo({
                label: 'Connect',
                visible: true,
              }),
            );
            dispatch(FetchUserData());
            dispatch(FetchRecentRide());
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;

const styles = StyleSheet.create({
  connectBtn: {
    position: 'absolute',
    bottom: hp(1),
    height: wp(20),
    width: wp(20),
  },
  middleButton: {
    height: wp(18),
    width: wp(18),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: hp(3),
    backgroundColor: color.sky,
    alignSelf: 'center',
  },
  middleButtonText: {
    fontSize: normalize(12),
    fontFamily: fonts.Lato_Bold,
    color: color.white,
  },
});
