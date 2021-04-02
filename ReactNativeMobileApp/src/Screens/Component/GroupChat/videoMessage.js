import React, {useEffect, useState, useRef} from 'react';
import {color, hp, isIOS, wp} from '../../../Helper/themeHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

export const VideoMessage = (props) => {
  const [isPlaying, toggleIsPlaying] = useState(false);
  let videoRef = useRef(null);
  const [id, setId] = useState(0);

  if (isIOS) {
    return (
      <View style={{alignItems: 'center', paddingBottom: hp(2)}}>
        <Video
          ref={videoRef}
          paused={!props?.currentMessage?.message_file_metadata?.isPlaying}
          source={{uri: props.currentMessage.video}}
          style={{height: wp(40), width: wp(60)}}
          controls={true}
          resizeMode={'contain'}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: hp(2),
        }}>
        <Video
          ref={videoRef}
          paused={!props?.currentMessage?.message_file_metadata?.isPlaying}
          source={{uri: props.currentMessage.video}}
          style={[{height: wp(40), width: wp(60)}]}
          controls={false}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => {
            setId(props.currentMessage._id);
            props.updatePlayStateLocally(
              props.currentMessage._id,
              !props?.currentMessage?.message_file_metadata?.isPlaying,
            );
          }}>
          <FontAwesome
            name={
              props?.currentMessage?.message_file_metadata?.isPlaying
                ? 'pause-circle'
                : 'play-circle'
            }
            size={hp(7)}
            color={color.sky}
          />
        </TouchableOpacity>
      </View>
    );
  }
};
