import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {CheckBox} from '../../Common';
import {color, hp} from '../../../Helper/themeHelper';
const preferences = ['Apple Music', 'Spotify', 'None'];
import {useDispatch, useSelector} from 'react-redux';
import {Update_Setting} from '../../../Redux/Actions/SettingsAction';

export const MusicPreferences = () => {
  const dispatch = useDispatch();
  const settingData = useSelector((state) => state.setting.settingDetails);
  let authToken = useSelector((state) => state.user.authToken);

  const [apple_music, setAppleMusic] = useState({
    title:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.apple_music.title,
    is_enabled:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.apple_music.is_enabled,
  });

  const [spotify, setSpotify] = useState({
    title:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.spotify.title,
    is_enabled:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.spotify.is_enabled,
  });
  const [none, setNone] = useState({
    title:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.none.title,
    is_enabled:
      settingData &&
      settingData.music_preferences &&
      settingData.music_preferences.none.is_enabled,
  });
  const [musicPreference, setMusicPreference] = useState(
    settingData && settingData.music_preferences,
  );

  const [userSettings, setUserSetting] = useState({setting_json: settingData});
  const [music, setMusic] = useState(
    apple_music.is_enabled
      ? 0
      : spotify.is_enabled
      ? 1
      : none.is_enabled
      ? 2
      : 0,
  );

  const createdUpdatedObject = async (item) => {
    if (item === 'Apple Music') {
      setMusic(0);
      let _appleMusic = apple_music;
      _appleMusic.is_enabled = true;
      let _spotify = spotify;
      _spotify.is_enabled = false;
      let _none = none;
      _none.is_enabled = false;
      setAppleMusic(_appleMusic);
      setSpotify(_spotify);
      setNone(_none);
      let _musicPreference = musicPreference;
      _musicPreference.apple_music = apple_music;
      _musicPreference.spotify = spotify;
      _musicPreference.none = none;
      setMusicPreference(_musicPreference);
      let userSet = userSettings;
      userSet.setting_json.music_preferences = _musicPreference;

      setUserSetting(userSet);
    } else if (item === 'Spotify') {
      setMusic(1);
      let _appleMusic = apple_music;
      _appleMusic.is_enabled = false;
      let _spotify = spotify;
      _spotify.is_enabled = true;
      let _none = none;
      _none.is_enabled = false;
      setAppleMusic(_appleMusic);
      setSpotify(_spotify);
      setNone(_none);
      let _musicPreference = musicPreference;

      _musicPreference.apple_music = apple_music;
      _musicPreference.spotify = spotify;
      _musicPreference.none = none;
      setMusicPreference(_musicPreference);
      let userSet = userSettings;
      userSet.setting_json.music_preferences = _musicPreference;

      setUserSetting(userSet);
    } else if (item === 'None') {
      setMusic(2);
      let _appleMusic = apple_music;
      _appleMusic.is_enabled = false;
      let _spotify = spotify;
      _spotify.is_enabled = false;
      let _none = none;
      _none.is_enabled = true;
      setAppleMusic(_appleMusic);
      setSpotify(_spotify);
      setNone(_none);
      let _musicPreference = musicPreference;
      _musicPreference.apple_music = apple_music;
      _musicPreference.spotify = spotify;
      _musicPreference.none = none;
      setMusicPreference(_musicPreference);
      let userSet = userSettings;
      userSet.setting_json.music_preferences = _musicPreference;

      setUserSetting(userSet);
    }

    return userSettings;
  };

  const renderItem = ({item, index}) => {
    const isChecked = index === music;
    return (
      <View style={{flex: 1}}>
        <CheckBox
          title={item}
          isChecked={isChecked}
          onPress={() =>
            createdUpdatedObject(item).then((res) => {
              if (res) {
                dispatch(Update_Setting(res));
              }
            })
          }
          titleStyle={styles.labelStyle}
          viewStyle={{flex: 1, marginBottom: hp(1)}}
          rounded={true}
          checkboxStyle={[
            isChecked && {borderWidth: 0, backgroundColor: color.sky},
          ]}
        />
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.headingStyle}>Music Preferences</Text>
      <View style={styles.innerContainer}>
        <FlatList
          data={preferences}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
};
