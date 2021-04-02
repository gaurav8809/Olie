import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {calendar, olie_black_logo, verified} from '../Assets';
import {color, fonts, hp, normalize, wp} from '../../Helper/themeHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AppHeader = (props) => {
  const insets = useSafeAreaInsets();

  const {container, logo, mainView, headingTextStyle} = styles;
  const {
    navigation,
    isSetting = false,
    isBack = false,
    HeaderText = null,
    onBack = null,
    rightComponent = <View />,
    containerStyle = null,
  } = props;
  return (
    <View
      style={[
        mainView,
        {paddingTop: insets.top > 0 ? insets.top : hp(1)},
        containerStyle,
      ]}>
      <View style={[container]}>
        {(isSetting && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <SimpleLineIcons
              name={'options-vertical'}
              color={color.sky}
              size={hp(3)}
            />
          </TouchableOpacity>
        )) ||
          (isBack && (
            <TouchableOpacity
              onPress={() => (onBack ? onBack() : navigation.goBack())}>
              <MaterialIcons
                name={'arrow-back-ios'}
                color={color.sky}
                size={hp(3)}
              />
            </TouchableOpacity>
          ))}
        <Image source={olie_black_logo} style={logo} resizeMode={'contain'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {HeaderText && <Text style={headingTextStyle}>{HeaderText}</Text>}
        {rightComponent}
      </View>
    </View>
  );
};

const AppInfoHeader = (props) => {
  const insets = useSafeAreaInsets();
  const {
    rightComponent = <View style={{flex: 1}} />,
    isHeaderComponent = false,
    headerText = '',
    leftComponent = <View style={{flex: 1}} />,
    containerStyle = null,
  } = props;
  return (
    <View
      style={[
        styles.headerContainer,
        {paddingTop: insets.top > 0 ? insets.top + hp(2) : hp(2)},
        containerStyle,
      ]}>
      {leftComponent}
      {isHeaderComponent ? (
        <View style={{alignItems: 'center', flex: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.blackBoldText}>Ride Out</Text>
            <Image
              source={verified}
              style={{
                height: wp(4),
                width: wp(4),
                resizeMode: 'contain',
                marginLeft: wp(2),
              }}
            />
          </View>
          <Text style={styles.lightsubtext}>Sponsored Event</Text>
        </View>
      ) : (
        <Text style={[styles.blackBoldText, {textAlign: 'center', flex: 2}]}>
          {headerText}
        </Text>
      )}
      {rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    backgroundColor: color.light_background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    backgroundColor: color.light_background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: hp(3.5),
    width: hp(8),
    bottom: -hp(1.5),
  },
  headingTextStyle: {
    color: color.black_33,
    fontSize: normalize(30),
    fontFamily: fonts.Lato_Bold,
    marginLeft: wp(1),
    marginTop: hp(2),
  },
  blackBoldText: {
    color: color.black_33,
    fontSize: normalize(16),
    fontFamily: fonts.Lato_Bold,
  },
  lightsubtext: {
    color: color.gray,
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(12),
    marginTop: hp(0.5),
  },
});

export {AppHeader, AppInfoHeader};
