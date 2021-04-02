/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import {color, hp, wp} from '../../../Helper/themeHelper';
import {CustomAction} from './customAction';
import Entypo from 'react-native-vector-icons/Entypo';
import {mic_icon, send_btn} from '../../Assets';
import {CustomSend} from './customSend';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      // position: 'absolute',
      backgroundColor: 'rgba(242, 242, 247, 0.8)',
      paddingTop: hp(1),
    }}
    primaryStyle={{alignItems: 'center'}}
  />
);

export const renderActions = (props) => <CustomAction {...props} />;

//export const renderComposer = (props) => <View />;

export const renderSend = (props) => <CustomSend {...props} />;
export const renderComposer = (props) => <View />;

export const renderChatFooter = (props) => (
  <Image
    style={{width: 32, height: 32}}
    source={{
      uri: 'https://placeimg.com/32/32/any',
    }}
  />
);
