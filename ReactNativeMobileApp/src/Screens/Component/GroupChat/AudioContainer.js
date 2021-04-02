import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';
import {color, hp, wp} from '../../../Helper/themeHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {DefaultProfileImage} from '../../Common';

export const AudioContainer = (props) => {
  const isFocused = useIsFocused();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [id, setId] = useState(0);
  const [isLoading, toggleLoading] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    return () => {
      onUpdatePlayStateLocally(false);
      setSliderValue(0);
    };
  }, [isFocused]);

  useEffect(() => {}, [props.currentMessage]);

  useEffect(() => {
    if (!isSeeking && position) {
      setSliderValue(position);
    }
  }, [position, duration]);

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const onUpdatePlayStateLocally = (state) => {
    setId(props.currentMessage._id);
    props.updatePlayStateLocally(props.currentMessage._id, state);
  };

  const slidingCompleted = (value) => {
    audioRef?.current?.seek(value);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const onPlayPause = () => {
    if (props?.currentMessage?.message_file_metadata?.isPlaying) {
      onUpdatePlayStateLocally(false);
    } else {
      onUpdatePlayStateLocally(true);
      slidingCompleted(position + 1);
    }
  };
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

  const onValueChange = (value) => {
    setIsSeeking(true);
    setSliderValue(value);
  };

  const renderAudioView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(3),
          paddingBottom: hp(2),
          paddingVertical: hp(1),
        }}>
        {props?.currentMessage?.user?.avatar ? (
          <Image
            style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
            source={{
              uri: props?.currentMessage?.user?.avatar,
            }}
          />
        ) : (
          <DefaultProfileImage
            name={props?.currentMessage?.user?.short_name}
            style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
          />
        )}
        <TouchableOpacity
          disabled={isLoading}
          style={{width: wp(7), marginHorizontal: wp(3)}}
          onPress={() => onPlayPause()}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={color.sky} />
          ) : (
            <FontAwesome
              name={
                props?.currentMessage?.message_file_metadata?.isPlaying
                  ? 'pause'
                  : 'play'
              }
              size={wp(7)}
              color={color.sky}
            />
          )}
        </TouchableOpacity>

        <View>
          <Video
            ref={audioRef}
            paused={!props?.currentMessage?.message_file_metadata?.isPlaying}
            source={{
              uri: props?.currentMessage?.audio,
            }}
            style={{height: wp(0), width: wp(0)}}
            controls={false}
            onLoadStart={() => toggleLoading(true)}
            // onBuffer={() => toggleLoading(true)}
            onEnd={() => {
              setPosition(0);
              onUpdatePlayStateLocally(false);
              setSliderValue(0);
            }}
            onLoad={({currentPosition, duration}) => {
              // setPosition(currentPosition);
              setDuration(duration);
              toggleLoading(false);
            }}
            onProgress={({currentTime}) => {
              setPosition(currentTime);
            }}
            onError={() => toggleLoading(false)}
            audioOnly={true}
          />
          <Slider
            style={{width: wp(50), height: hp(1)}}
            minimumValue={0}
            maximumValue={duration}
            value={sliderValue}
            minimumTrackTintColor={color.sky}
            maximumTrackTintColor={color.gray}
            onSlidingStart={slidingStarted}
            onSlidingComplete={slidingCompleted}
            onValueChange={onValueChange}
            disabled={isLoading}
          />
        </View>

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
      </View>
    );
  };
  return <View>{renderAudioView()}</View>;
};
