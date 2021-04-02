import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
import {color, hp, isANDROID, normalize, wp} from '../../../Helper/themeHelper';
import {camera, mic_icon, send_btn} from '../../Assets';
import {Composer, GiftedChat, Send} from 'react-native-gifted-chat';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SoundRecorder from 'react-native-sound-recorder';
import styles from './styles';
import {UploadFileInChat} from '../../../Redux/Actions/GroupsAction';
import {useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {openCameraPicker} from '../../../Helper/imageUpload';

export const CustomSend = (props) => {
  const dispatch = useDispatch();

  const config = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 98,
    gestureIsClickThreshold: 1,
  };

  const [isRecording, toggleRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCancelled, toggleIsCancelled] = useState(false);
  const [panRelease, togglePanRelease] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        togglePanRelease(false);
        onStartRecord();
      },
      onPanResponderRelease: () => {
        togglePanRelease(true);
      },
    }),
  ).current;

  useEffect(() => {
    if (panRelease) {
      if (timer > 0) {
        onSendAudio();
      } else {
        onStopRecord();
      }
    }
  }, [panRelease, timer]);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const convertTimerFormat = (sec) => {
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

  const onStartRecord = async () => {
    try {
      if (isRecording) {
        return onSendAudio();
      }
      if (!(isRecording || isCancelled)) {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the storage');
            } else {
              console.log('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the recorder');
            } else {
              console.log('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        let currentTime = new Date();
        let fileName = 'Olie_' + currentTime.getTime();
        console.log(SoundRecorder.PATH_DOCUMENT);
        const path = Platform.select({
          ios: `${fileName}.m4a`,
          android: `${SoundRecorder.PATH_DOCUMENT}/${fileName}.mp3`,
        });
        SoundRecorder.start(path).then(function () {
          toggleRecording(true);
        });
      }
    } catch (e) {
      console.log('start recording error' + e);
    }
  };

  const onStopRecord = () => {
    try {
      return SoundRecorder.stop().then(function (result) {
        toggleRecording(false);
        setTimer(0);
        return result.path;
      });
    } catch (e) {
      console.log('stop recording error' + e);
    }
  };

  const onSwipeLeft = () => {
    if (isRecording && !isCancelled) {
      onStopRecord().then((r) => {
        toggleIsCancelled(true);
        setTimeout(() => {
          toggleIsCancelled(false);
        }, 1000);
      });
    }
  };

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_LEFT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        onSwipeLeft();
        break;
    }
  };

  const onSendAudio = () => {
    setTimeout(() => {
      if (!isCancelled) {
        onStopRecord().then((path) => {
          togglePanRelease(false);
          //audio: 'file://' + path,
          let currentTime = new Date();
          let extension = Platform.select({
            ios: 'm4a',
            android: 'mp3',
          });
          let payload = {};
          RNFetchBlob.fs.stat(path).then((data) => {
            payload = {
              uri: encodeURI('file://' + data?.path),
              name: data?.filename,
              type: 'audio/mpeg',
              // type: data?.type,
              // uri:'content:/'
              //   'content://com.mi.android.globalFileexplorer.myprovider/external_files/Olie_1602073098453.mp3',
              // uri: isANDROID ? path : path.replace('file://', ''),
            };
            dispatch(UploadFileInChat({message_file: payload})).then((res) => {
              if (res?.length > 0) {
                return props.onSend({
                  message_file: res[0].url,
                  message_file_type: 'audio',
                  message_file_metadata: {...res[0], isPlaying: false},
                });
              }
            });
          });
        });
      }
    }, 100);
  };

  return (
    <View style={styles.rowStyle}>
      {!(isRecording || isCancelled) ? (
        <View style={{flex: 1}}>
          <Composer
            {...props}
            textInputStyle={{
              marginLeft: 0,
              paddingHorizontal: wp(6),
            }}
          />
        </View>
      ) : null}

      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeLeft={onSwipeLeft}
        config={config}
        style={{
          ...styles.rowStyle,
          flex: isRecording || isCancelled ? 1 : 0,
        }}>
        {isRecording || isCancelled ? (
          <View style={styles.rowStyle}>
            <Text>{convertTimerFormat(timer)}</Text>
            <GestureRecognizer
              onSwipe={(direction, state) => onSwipe(direction, state)}
              onSwipeLeft={onSwipeLeft}
              config={config}
              style={{flex: 1}}>
              <Text
                style={[
                  styles.swipeToCancel,
                  isCancelled && {color: color.red},
                ]}>
                {isCancelled ? 'Cancelled' : 'Swipe to cancel <'}
              </Text>
            </GestureRecognizer>
          </View>
        ) : null}
        <View {...panResponder.panHandlers}>
          {/*<TouchableOpacity*/}
          {/*  style={{marginRight: wp(1)}}*/}
          {/*  // onPressIn={onStartRecord}*/}
          {/*  // onPressOut={onSendAudio}*/}
          {/*>*/}
          <Image
            source={mic_icon}
            style={{
              width: wp(7),
              height: wp(7),
              opacity: isRecording ? 0.3 : 1,
            }}
          />
          {/*</TouchableOpacity>*/}
        </View>
      </GestureRecognizer>
      <TouchableOpacity
        style={{marginHorizontal: wp(2)}}
        onPress={() => {
          openCameraPicker({freeStyleCropEnabled: true}).then((image) => {
            dispatch(UploadFileInChat({message_file: image})).then((res) => {
              props.onSend({
                message_file: res[0].url,
                message_file_type: 'image',
                message_file_metadata: res[0],
              });
            });
          });
        }}>
        <Image
          source={camera}
          style={{
            width: wp(6),
            height: wp(6),
          }}
        />
      </TouchableOpacity>
      <Send
        {...props}
        disabled={!props.text}
        sendButtonProps={{
          style: {marginRight: wp(3), opacity: !props.text ? 0.3 : 1},
        }}>
        <Image source={send_btn} style={{width: wp(6), height: wp(6)}} />
      </Send>
    </View>
  );
};
