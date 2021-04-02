import React, {useEffect} from 'react';
import {View, Text, UIManager, ScrollView} from 'react-native';
import styles from './styles';
import {AppHeader} from '../../Common';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../../../Helper/themeHelper';
import {NewTab} from './NewTab';
import {ChallengesTab} from './ChallengesTab';
import {PopularTab} from './PopularTab';
import {FindFriends} from './FindFriendsTab';
import {useSelector} from 'react-redux';
import {startGpsLocation} from '../../../Helper/permissionAndroid';
import {useDispatch} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import {SignOut} from '../../../Redux/Actions/AuthAction';
import {
  FetchGroupRideOuts,
  FetchGroups,
} from '../../../Redux/Actions/GroupsAction';
import {
  FetchChallenges,
  FetchPopularChallenges,
} from '../../../Redux/Actions/ChallangesAction';
import {CommonActions} from '@react-navigation/native';
import {Get_Setting} from '../../../Redux/Actions/SettingsAction';
import {FetchActivities} from '../../../Redux/Actions/ActivityAction';
import {FetchRecentRide} from '../../../Redux/Actions/ProfileAction';
import {setBottomTabMiddleButtonInfo} from '../../../Redux/Actions/SystemAction';

if (isANDROID && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home = ({navigation}) => {
  const authToken = useSelector((state) => state.user.authToken);
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchGroups());
    dispatch(Get_Setting());
    dispatch(FetchGroupRideOuts());
    dispatch(FetchChallenges());
    dispatch(FetchPopularChallenges());

    dispatch(FetchActivities());
    dispatch(FetchRecentRide());
    isANDROID && startGpsLocation();
    EventRegister.addEventListener('LogoutEvent', (data) => {
      dispatch(SignOut()).then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthSelection'}],
          }),
        );
      });
      dispatch(
        setBottomTabMiddleButtonInfo({
          label: 'Connect',
          visible: true,
        }),
      );
    });

    if (__DEV__) {
      console.log('authToken - ', authToken);
      console.log('user Id - ', userDetail?.user_id);
    }
  }, []);

  return (
    <View style={[styles.container]}>
      <AppHeader isSetting={true} navigation={navigation} HeaderText={'Home'} />
      <ScrollableTabView
        // locked={true}
        // prerenderingSiblingsNumber={1}
        scrollWithoutAnimation={true}
        style={{marginTop: hp(1)}}
        tabBarActiveTextColor={color.sky}
        tabBarInactiveTextColor={color.gray}
        tabBarTextStyle={{
          fontFamily: fonts.Lato_Regular,
          fontSize: normalize(14),
        }}
        tabBarUnderlineStyle={{backgroundColor: color.sky}}
        initialPage={0}
        renderTabBar={() => (
          <ScrollableTabBar
            style={{borderBottomWidth: 0}}
            tabsContainerStyle={{paddingLeft: wp(6), paddingRight: wp(50)}}
          />
        )}>
        <NewTab tabLabel="New" navigation={navigation} />
        <ChallengesTab tabLabel="Challenges" navigation={navigation} />
        <PopularTab tabLabel="Popular" navigation={navigation} />
        <FindFriends tabLabel="Find Friends" navigation={navigation} />
      </ScrollableTabView>
    </View>
  );
};
export default Home;
