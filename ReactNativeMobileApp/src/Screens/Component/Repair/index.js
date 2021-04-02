import React, {createRef} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {AppHeader} from '../../Common';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';
import {RepairTab} from './RepairTab';

const Repair = ({navigation}) => {
  let scrollableTab = createRef();
  return (
    <View style={styles.container}>
      <AppHeader
        isBack={true}
        navigation={navigation}
        HeaderText={'Repair Shops'}
      />
      <View style={styles.container}>
        <ScrollableTabView
          ref={scrollableTab}
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
          initialPage={0}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{borderBottomWidth: 0}}
              tabsContainerStyle={{
                justifyContent: 'flex-start',
                paddingLeft: wp(6),
              }}
            />
          )}>
          <RepairTab tabLabel="Repair Shops" navigation={navigation} />
        </ScrollableTabView>
      </View>
    </View>
  );
};
export default Repair;
