import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Component/Home';
import AddFriend from '../Screens/Component/AddFriend';
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
