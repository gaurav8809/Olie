import React from 'react';
import {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';
import styles from './styles';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {AddFriendTab} from './AddFriendTab/index';
import {QRCode} from './AddFriendTab/qrCode';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setBottomTabVisibility} from '../../../Redux/Actions/SystemAction';
import {useDispatch} from 'react-redux';

const AddFriend = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          paddingTop: insets.top > 0 ? insets.top : hp(1),
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.backBtnStyle,
          {top: insets.top > 0 ? insets.top : hp(1)},
        ]}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name={'arrow-back-ios'} color={color.sky} size={hp(3)} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <ScrollableTabView
          // locked={true}
          scrollWithoutAnimation={true}
          tabBarActiveTextColor={color.sky}
          tabBarInactiveTextColor={color.gray}
          tabBarTextStyle={styles.tabTextStyle}
          tabBarUnderlineStyle={{backgroundColor: color.sky}}
          initialPage={0}
          onChangeTab={(tab) => {
            if (tab.i == 1) {
              dispatch(setBottomTabVisibility(false));
            } else {
              dispatch(setBottomTabVisibility(true));
            }
          }}
          renderTabBar={() => (
            <ScrollableTabBar
              style={styles.scrollTabStyle}
              tabsContainerStyle={{justifyContent: 'center'}}
            />
          )}>
          <AddFriendTab tabLabel="Add Friend" navigation={navigation} />
          <QRCode tabLabel="QR Code" navigation={navigation} />
        </ScrollableTabView>
      </View>
    </View>
  );
};
export default AddFriend;
