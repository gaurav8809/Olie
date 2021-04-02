import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, hp, wp} from '../../../Helper/themeHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  STATE_BUFFERING,
  STATE_PLAYING,
  STATE_READY,
} from 'react-native-track-player';
import styles from './styles';

export const CustomAudioView = (props) => {
  const playerState = TrackPlayer.getState();
  let playerTrackId = TrackPlayer.getCurrentTrack();

  const {
    sliderValue,
    slidingStarted,
    slidingCompleted,
    isPlaying,
    onPlayPause,
    avatar,
    onValueChange,
    duration,
    position,
    isCurrentPlayer,
    msgId,
  } = props;

  const [isLoading, toggleLoading] = useState(false);

  useEffect(() => {
    playerState.then(async (state) => {
      const trackId = await playerTrackId;
      if (
        trackId == msgId &&
        isPlaying &&
        (state === STATE_BUFFERING || state === STATE_READY)
      ) {
        toggleLoading(true);
      } else {
        toggleLoading(false);
      }
    });
  }, [playerState, msgId, playerTrackId, duration, position]);

  const convertTimerFormat = (secData) => {
    const sec = parseInt(secData);
    let minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    let finalTime =
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds;
    return finalTime;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        paddingBottom: hp(2),
      }}>
      <Image
        style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
        source={{
          uri: 'https://source.unsplash.com/user/erondu',
        }}
      />
      <TouchableOpacity
        disabled={isLoading}
        style={{marginHorizontal: wp(3)}}
        onPress={() => onPlayPause()}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={color.sky} />
        ) : (
          <FontAwesome
            name={isCurrentPlayer && isPlaying ? 'pause' : 'play'}
            size={wp(7)}
            color={color.sky}
          />
        )}
      </TouchableOpacity>

      <View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Slider
          style={{width: wp(50), height: hp(1)}}
          minimumValue={0}
          maximumValue={duration}
          value={isCurrentPlayer ? sliderValue : 0}
          minimumTrackTintColor={color.sky}
          maximumTrackTintColor={color.gray}
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          onValueChange={onValueChange}
          disabled={isLoading}
        />
      </View>

      {isCurrentPlayer && isPlaying && (
        <Text
          style={[
            styles.grayText,
            {
              position: 'absolute',
              bottom: hp(2),
              right: wp(5),
            },
          ]}>
          {convertTimerFormat(position) + '/' + convertTimerFormat(duration)}
        </Text>
      )}
    </View>
  );
};
