import React, {useEffect} from 'react';
import {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  color,
  fonts,
  hp,
  normalize,
  wp,
} from '../../../../../Helper/themeHelper';
import styles from './styles';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {AchievementTab} from './AchievementTab/index';
import {ActivityNewTab} from './NewTab/index';
import {RecentTab} from './RecentTab/index';
import {AppHeader} from '../../../../Common';
import {useDispatch} from 'react-redux';
import {FetchNewChallenges} from '../../../../../Redux/Actions/ChallangesAction';

const ActivityTab = (props) => {
  const dispatch = useDispatch();

  const {navigation = null} = props;
  useEffect(() => {
    dispatch(FetchNewChallenges());
  }, []);
  return (
    <View style={[styles.container]}>
      <AppHeader
        isSetting={true}
        HeaderText={'Activity'}
        navigation={navigation}
      />
      <ScrollableTabView
        // locked={true}
        scrollWithoutAnimation={true}
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
            tabsContainerStyle={{paddingLeft: wp(6)}}
          />
        )}>
        <RecentTab tabLabel="Recent" navigation={navigation} />
        <AchievementTab tabLabel="Achievements" />
        <ActivityNewTab tabLabel="New" />
      </ScrollableTabView>
    </View>
  );
};
export default ActivityTab;
