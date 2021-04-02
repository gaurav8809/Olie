/* eslint-disable react/jsx-props-no-spreading */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Time,
  Day,
} from 'react-native-gifted-chat';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../../../Helper/themeHelper';
import styles from './styles';
// import {AudioMessage} from './audioMessage';
import {AudioContainer} from './AudioContainer';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CurrentMarker} from '../../Common/AppMarkers';
import {VideoMessage} from './videoMessage';
import {PDfContainer} from './PdfContainer';
import {SharedContact} from './SharedContact';
import moment from 'moment';

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    // containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
    // imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
  />
);

export const renderBubble = (props) => (
  <Bubble
    {...props}
    renderTime={() => <View />}
    timeTextStyle={{
      right: {
        color: 'red',
      },
      left: {
        color: 'red',
      },
    }}
    // renderTicks={() => <Text>Ticks</Text>}
    // containerStyle={{
    //   left: { borderColor: 'teal', borderWidth: 8 },
    //   right: {},
    // }}
    wrapperStyle={{
      left: {
        borderRadius: wp(5),
        borderTopLeftRadius: 0,
        borderWidth: 1,
        borderColor: color.sky,
        marginLeft: wp(-3),
        marginTop: hp(1),
        overflow: 'hidden',
      },
      right: {
        marginTop: hp(1),
        borderBottomRightRadius: 0,
        backgroundColor: color.lightSky,
        borderRadius: wp(5),
        overflow: 'hidden',
      },
    }}
    // textStyle={{
    //   left: [styles.blackText, {fontSize: normalize(14)}],
    //   right:  [styles.blackText, {fontSize: normalize(14)}],
    // }}
    // bottomContainerStyle={{
    //   left: { borderColor: 'purple', borderWidth: 4 },
    //   right: {},
    // }}
    // tickStyle={{}}
    // usernameStyle={{ color: 'tomato', fontWeight: '100' }}
    // containerToNextStyle={{
    //   left: { borderColor: 'navy', borderWidth: 4 },
    //   right: {},
    // }}
    // containerToPreviousStyle={{
    //   left: { borderColor: 'mediumorchid', borderWidth: 4 },
    //   right: {},
    // }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    textStyle={{
      marginHorizontal: wp(5),
      flex: 1,
      fontFamily: fonts.Lato_Bold,
      fontSize: normalize(12),
    }}
    // containerStyle={{ backgroundColor: 'pink' }}
    // wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
    // textStyle={{ color: 'crimson', fontWeight: '900' }}
  />
);

export const renderMessage = (props) => {
  return (
    <Message
      {...props}
      containerStyle={
        {
          // left: { backgroundColor: 'lime' },
          // right: { backgroundColor: 'gold' },
        }
      }
    />
  );
};
export const renderDay = (props) => {
  if (
    moment(props.currentMessage.createdAt).format('lll') ===
    moment(props.previousMessage.createdAt).format('lll')
  ) {
    return true;
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Day
        {...props}
        key={props.key}
        containerStyle={{marginTop: 0, marginBottom: 0, marginRight: 0}}
        textStyle={{
          fontSize: normalize(12),
          fontFamily: fonts.Lato_Bold,
          color: color.gray,
        }}
      />
      <Time
        {...props}
        key={props.key}
        timeTextStyle={{
          right: [
            {
              color: color.gray,
              fontSize: normalize(12),
              fontFamily: fonts.Lato_Bold,
              textAlign: 'center',
            },
          ],
          left: {
            color: color.gray,
            fontSize: normalize(12),
            fontFamily: fonts.Lato_Bold,
            textAlign: 'center',
          },
        }}
      />
    </View>
  );
};

export const renderTime = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Day
        {...props}
        key={'DayKey' + props.key}
        containerStyle={{marginTop: 0, marginBottom: 0, marginRight: 0}}
        textStyle={{
          fontSize: normalize(12),
          fontFamily: fonts.Lato_Bold,
          color: color.gray,
        }}
      />
      <Time
        {...props}
        key={'TimeKey' + props.key}
        timeTextStyle={{
          right: [
            {
              color: color.gray,
              fontSize: normalize(12),
              fontFamily: fonts.Lato_Bold,
              textAlign: 'center',
            },
          ],
          left: {
            color: color.gray,
            fontSize: normalize(12),
            fontFamily: fonts.Lato_Bold,
            textAlign: 'center',
          },
        }}
      />
    </View>
  );
};

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    // containerStyle={{
    //   left: { backgroundColor: 'yellow' },
    //   right: { backgroundColor: 'purple' },
    // }}
    textStyle={{
      left: [styles.blackText, {fontSize: normalize(14)}],
      right: [styles.blackText, {fontSize: normalize(14)}],
    }}
    linkStyle={{
      left: [styles.blackText, {fontSize: normalize(14)}],
      right: [styles.blackText, {fontSize: normalize(14)}],
    }}
    // customTextStyle={{ fontSize: 24, lineHeight: 24 }}
  />
);

export const renderCustomView = (props) => {
  const currentMessage = props?.currentMessage || null;
  return (
    <View style={{}}>
      {currentMessage?.location?.latitude ? (
        renderMessageLocation(props)
      ) : currentMessage?.document && props?.currentMessage?.document ? (
        renderMessageDocument(props)
      ) : currentMessage?.contact ? (
        renderMessageContact(props)
      ) : (
        <View />
      )}
    </View>
  );
};

export const renderMessageVideo = (props) => <VideoMessage {...props} />;

export const renderMessageAudio = (props) => <AudioContainer {...props} />;
// export const renderMessageAudio = (props) => null;

export const renderMessageLocation = (props) => {
  const initialRegion = props.currentMessage.location;
  return (
    <TouchableOpacity
      style={{}}
      onPress={() => {
        const URL = isANDROID
          ? `http://maps.google.com/?q=${initialRegion.latitude},${initialRegion.longitude}`
          : `http://maps.apple.com/?ll=${initialRegion.latitude},${initialRegion.longitude}`;

        Linking.openURL(URL);
      }}>
      {/*<Text>{initialRegion}</Text>*/}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: wp(40),
          width: wp(60),
          zIndex: 10,
          // marginVertical: hp(1),
          // marginHorizontal: wp(2),
          // borderRadius: wp(5),
        }}
        region={initialRegion}
        initialRegion={initialRegion}
        scrollEnabled={false}
        zoomEnabled={false}>
        <Marker coordinate={initialRegion}>
          <CurrentMarker />
        </Marker>
      </MapView>
    </TouchableOpacity>
  );
};
export const renderMessageDocument = (props) => <PDfContainer {...props} />;
export const renderMessageContact = (props) => <SharedContact {...props} />;
// export const renderMessageImage = (props) => <ImageMessage {...props} />;
