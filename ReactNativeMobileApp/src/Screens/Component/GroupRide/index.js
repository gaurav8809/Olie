import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {AppHeader} from '../../Common';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';
import {Groups} from './Groups';
import {RideOuts} from './RideOuts';
import {GroupContacts} from './GroupContacts';
import {CreateGroups} from './CreateGroups';
import {CreateGroupRide} from './CreateGroupRide';
import {CreateRideOut} from './CreateRideOut';
import {FetchFriends} from '../../../Redux/Actions/FriendsAction';
import {useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const GroupRide = ({navigation, route}) => {
  const initialTab = route?.params?.initialTab ?? 0;
  const [previousTab, setPreviousTab] = useState(initialTab);
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isCreateRideOut, setIsCreateRideOut] = useState(false);
  const tabView = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchFriends())
      .then((res) => {})
      .catch((e) => console.log(e));
  }, []);

  const headerRightComponent = () => {
    if (currentTab === 2) {
      return <View />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (currentTab === 0) {
            setIsCreateGroup(true);
          } else {
            setIsCreateRideOut(true);
          }
        }}
        style={{
          marginTop: hp(3),
          height: hp(3),
          width: hp(3),
          backgroundColor: color.sky,
          borderRadius: hp(1.5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5 name={'plus'} color={color.white} size={hp(2)} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        isBack={true}
        navigation={navigation}
        HeaderText={'Group Ride'}
        rightComponent={headerRightComponent()}
      />
      {isCreateGroup && (
        <CreateGroupRide
          onClose={() => {
            setIsCreateGroup(false);
          }}
        />
      )}
      {isCreateRideOut && (
        <CreateRideOut
          onClose={() => {
            setIsCreateGroup(false);
          }}
          onCancelAction={() => setIsCreateRideOut(false)}
        />
      )}
      <View style={styles.container}>
        <ScrollableTabView
          ref={tabView}
          // locked={true}
          scrollWithoutAnimation={true}
          style={{marginTop: hp(1)}}
          tabBarActiveTextColor={color.sky}
          tabBarInactiveTextColor={color.gray}
          tabBarTextStyle={{
            fontFamily: fonts.Lato_Regular,
            fontSize: normalize(14),
          }}
          tabBarUnderlineStyle={{backgroundColor: color.sky}}
          initialPage={initialTab}
          activeTab={initialTab}
          onChangeTab={(tab) => {
            if (tab.i != tab.from) {
              setCurrentTab(tab.i);
              setPreviousTab(tab.from);
            }
          }}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{borderBottomWidth: 0}}
              tabsContainerStyle={{paddingLeft: wp(6), paddingRight: wp(50)}}
            />
          )}>
          <Groups tabLabel="Groups" navigation={navigation} />
          <RideOuts tabLabel="Ride Outs" navigation={navigation} />
          <GroupContacts tabLabel="Contacts" navigation={navigation} />
          {/*<CreateGroups*/}
          {/*  tabLabel="Create+"*/}
          {/*  navigation={navigation}*/}
          {/*  onCancelAction={() => tabView.current.goToPage(previousTab)}*/}
          {/*  activeTab={previousTab}*/}
          {/*/>*/}
        </ScrollableTabView>
      </View>
    </View>
  );
};
export default GroupRide;
