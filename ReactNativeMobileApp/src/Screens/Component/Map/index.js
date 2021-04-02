import React, {createRef, useEffect, useState} from 'react';
import {View, BackHandler} from 'react-native';
import styles from './styles';
import {AppHeader} from '../../Common';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {color, fonts, hp, normalize, wp} from '../../../Helper/themeHelper';
import {QuickStart} from './QuickStartTab';
import {SetRoute} from './SetRouteTab';
import {Rentals} from './RentalsTab';
import {useDispatch} from 'react-redux';
import {
  setBottomTabMiddleButtonInfo,
  setBottomTabVisibility,
} from '../../../Redux/Actions/SystemAction';

const Map = ({navigation}) => {
  const dispatch = useDispatch();
  let scrollableTab = createRef();
  const goToTab = (tab) => {
    scrollableTab.current.goToPage(tab);
  };

  let [pageIndex, setPageIndex] = useState({
    current: 0,
    prev: 0,
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    dispatch(
      setBottomTabMiddleButtonInfo({
        label: 'Connect',
        visible: true,
      }),
    );
  };
  useEffect(() => {
    // alert(pageIndex.current)

    const unsubscribe = navigation.addListener('focus', (e) => {
      goToTab(0);
      pageIndex.current !== 2
        ? dispatch(
            setBottomTabMiddleButtonInfo({
              label: pageIndex.current === 0 ? 'Start' : 'Set',
              visible: true,
            }),
          )
        : dispatch(
            setBottomTabMiddleButtonInfo({
              visible: false,
            }),
          );
    });
    navigation.setOptions({tabBarVisible: pageIndex.current !== 2});
    dispatch(
      setBottomTabMiddleButtonInfo({
        label: pageIndex.current === 0 ? 'Start' : 'Set',
        visible: pageIndex.current !== 2,
      }),
    );
    return unsubscribe;
  }, [navigation, pageIndex]);

  return (
    <View style={styles.container}>
      <AppHeader
        isSetting={true}
        navigation={navigation}
        HeaderText={'Navigation'}
      />
      <View style={styles.container}>
        <ScrollableTabView
          ref={scrollableTab}
          locked={true}
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
          onChangeTab={(res) => {
            setPageIndex({
              current: res.i,
              prev: res.from,
            });
          }}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{borderBottomWidth: 0}}
              tabsContainerStyle={{
                paddingRight: wp(45),
                paddingLeft: wp(6),
              }}
            />
          )}
          // renderTabBar={() => (
          //   <ScrollableTabBar
          //     style={{borderBottomWidth: 0}}
          //     tabsContainerStyle={[
          //       {
          //         paddingHorizontal: wp(6),
          //       },
          //       pageIndex.current === 2 && {right: wp(30)},
          //     ]}
          //   />
          // )}
        >
          <QuickStart
            tabLabel="Quick Start"
            navigation={navigation}
            changeTab={goToTab}
            pageIndex={pageIndex}
          />
          <SetRoute
            tabLabel="Set Route"
            navigation={navigation}
            pageIndex={pageIndex}
          />
          <Rentals tabLabel="Rentals" navigation={navigation} />
        </ScrollableTabView>
      </View>
    </View>
  );
};
export default Map;
