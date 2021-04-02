import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from '../Screens/Component/SplashScreen';
import AuthSelection from '../Screens/Component/AuthSelection';
import Settings from '../Screens/Component/Settings';
import Home from './tabNavigation';
import GroupRide from '../Screens/Component/GroupRide';
import GroupChat from '../Screens/Component/GroupChat';
import GroupChatInfo from '../Screens/Component/GroupChatInfo';
import AddFriend from '../Screens/Component/AddFriend';
import MediaLinksDocs from '../Screens/Component/MediaLinksDocs';
import ContactInfo from '../Screens/Component/ContactInfo';
import ContactDetails from '../Screens/Component/GroupChat/ContactDetails';
import SharedContact from '../Screens/Component/GroupChat/SharedContact';
import StartingRideScreen from '../Screens/Component/GeneralScreens/StartingRideScreen';
import RepairShop from '../Screens/Component/Repair';
import Rankings from '../Screens/Component/Rankings';
import {Animated, Easing, LogBox} from 'react-native';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

const config = {
  animation: 'timing',
  config: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'SplashScreen'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthSelection" component={AuthSelection} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GroupRide" component={GroupRide} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="GroupChatInfo" component={GroupChatInfo} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="MediaLinksDocs" component={MediaLinksDocs} />
        <Stack.Screen name="ContactInfo" component={ContactInfo} />
        <Stack.Screen name="RepairShop" component={RepairShop} />
        <Stack.Screen
          name="StartingRideScreen"
          component={StartingRideScreen}
        />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="Rankings" component={Rankings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
