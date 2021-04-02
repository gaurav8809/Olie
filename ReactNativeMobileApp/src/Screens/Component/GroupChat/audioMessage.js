import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {useIsFocused} from '@react-navigation/native';
import {CustomAudioView} from './customAudioView';

export const AudioMessage = (props) => {
  const playbackState = usePlaybackState();
  const isFocused = useIsFocused();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  const [sliderValue, setSliderValue] = useState(0);
  const [previousPlayMsg, setPreviousPlayMsg] = useState(null);
  const [currentPlayMsg, setCurrentPlayMsg] = useState(null);

  const [isSeeking, setIsSeeking] = useState(false);
  const [activePlayer, setActivePlayer] = useState(false);

  const progress = useTrackPlayerProgress();
  const {duration, position} = progress;

  // const {position, duration} = useTrackPlayerProgress(250);

  useEffect(() => {
    return () => {
      TrackPlayer.stop().then((r) => {
        setIsPlaying(false);
        setSliderValue(0);
        setIsTrackPlayerInit(false);
      });
    };
  }, [isFocused]);
  useEffect(() => {
    if (activePlayer) {
      if (!isSeeking && position) {
        setSliderValue(position);
      }
    }
  }, [position, duration]);

  useEffect(() => {
    checkCurrentPlayer().then((isCurrentPlayer) => {
      if (activePlayer !== isCurrentPlayer) {
        setActivePlayer(isCurrentPlayer);
      }
    });
  }, [position, duration, isPlaying]);

  const slidingStarted = () => {
    if (activePlayer) {
      setIsSeeking(true);
    }
  };

  const checkCurrentPlayer = async () => {
    let trackId = await TrackPlayer.getCurrentTrack();
    let isCurrentPlayer = !!(trackId && trackId == props.currentMessage._id);
    return isCurrentPlayer;
  };

  const slidingCompleted = async (value) => {
    if (activePlayer) {
      await TrackPlayer.seekTo(value);
      await TrackPlayer.play();
      setSliderValue(value);
      setIsSeeking(false);
    }
  };

  const onPlayPause = () => {
    let trackId = TrackPlayer.getCurrentTrack();

    const trackPlayerInit = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
      await TrackPlayer.add({
        id: props.currentMessage._id,
        url: props.currentMessage.audio,
        type: 'default',
        title: 'Olie',
        album: 'Olie',
        artist: props.currentMessage.user.name,
        artwork: 'https://picsum.photos/100',
      });
    };

    if (trackId && trackId != props.currentMessage._id) {
      setIsPlaying(false);
      TrackPlayer.reset().then((r) =>
        TrackPlayer.add({
          id: props.currentMessage._id,
          url: props.currentMessage.audio,
          type: 'default',
          title: 'My Title',
          album: 'My Album',
          artist: 'Rohan Bhatia',
          artwork: 'https://picsum.photos/100',
        }),
      );
    }

    if (!isTrackPlayerInit) {
      trackPlayerInit().then((r) => setIsTrackPlayerInit(true));
    }
    if (isPlaying) {
      TrackPlayer.pause().then((r) => setIsPlaying(false));
    } else {
      let msg = {...props?.currentMessage};
      // if (previousPlayMsg !== null) {
      //
      //   previousPlayMsg.message_file_metadata.isPlaying = false;
      //   props?.onUpdateLocalMessages(previousPlayMsg);
      // }
      // ;
      // msg.message_file_metadata.isPlaying = true;
      // props?.onUpdateLocalMessages(msg);
      // setPreviousPlayMsg(
      //   previousPlayMsg === null ? {...msg} : {...currentPlayMsg},
      // );
      setCurrentPlayMsg({...msg});
      TrackPlayer.play().then((r) => setIsPlaying(true));
      // setIsPlaying(true);
    }
  };

  return (
    <View>
      <CustomAudioView
        msgId={props.currentMessage._id}
        sliderValue={sliderValue}
        slidingStarted={slidingStarted}
        slidingCompleted={slidingCompleted}
        isPlaying={props?.currentMessage?.message_file_metadata?.isPlaying}
        onPlayPause={onPlayPause}
        avatar={props.currentMessage.user.avatar}
        duration={duration}
        position={position}
        onValueChange={(value) => {
          if (activePlayer) {
            TrackPlayer.pause();
            setIsSeeking(true);
            setSliderValue(value);
          }
        }}
        isCurrentPlayer={activePlayer}
      />
    </View>
  );
};
