import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {SwitchRow} from './switchRow';
import {useDispatch, useSelector} from 'react-redux';
import {Update_Setting} from '../../../Redux/Actions/SettingsAction';

export const Permissions = () => {
  const dispatch = useDispatch();
  const settingData = useSelector((state) => state.setting.settingDetails);
  let authToken = useSelector((state) => state.user.authToken);
  const [location, toggleLocation] = useState({
    title:
      settingData &&
      settingData.permissions &&
      settingData.permissions.locations.title,
    is_enabled:
      settingData &&
      settingData.permissions &&
      settingData.permissions.locations.is_enabled,
  });
  const [contacts, toggleContacts] = useState({
    title:
      settingData &&
      settingData.permissions &&
      settingData.permissions.contacts.title,
    is_enabled:
      settingData &&
      settingData.permissions &&
      settingData.permissions.contacts.is_enabled,
  });
  const [camera, toggleCamera] = useState({
    title:
      settingData &&
      settingData.permissions &&
      settingData.permissions.camera.title,
    is_enabled:
      settingData &&
      settingData.permissions &&
      settingData.permissions.camera.is_enabled,
  });
  const [microphone, toggleMicrophone] = useState({
    title:
      settingData &&
      settingData.permissions &&
      settingData.permissions.microphone.title,
    is_enabled:
      settingData &&
      settingData.permissions &&
      settingData.permissions.microphone.is_enabled,
  });
  const [healthApp, toggleHealthApp] = useState({
    title:
      settingData &&
      settingData.permissions &&
      settingData.permissions.health_app.title,
    is_enabled:
      settingData &&
      settingData.permissions &&
      settingData.permissions.health_app.is_enabled,
  });
  const [userSettings, setUserSetting] = useState({setting_json: settingData});
  const [permissions, setPermissions] = useState(
    settingData && settingData.permissions,
  );
  const createUpdatedObject = async (groupName, enable) => {
    if (groupName === 'Allow access to location') {
      let _location = location;
      _location.is_enabled = enable;
      toggleLocation({title: location.title, is_enabled: enable});

      let _permissions = permissions;
      _permissions.locations = location;
      setPermissions(_permissions);
      let userSet = userSettings;
      userSet.setting_json.permission = location;
      setUserSetting(userSet);
    } else if (groupName === 'Allow access to contacts') {
      let _contacts = contacts;
      _contacts.is_enabled = enable;
      toggleContacts({title: contacts.title, is_enabled: enable});

      let _permissions = permissions;
      _permissions.contacts = contacts;
      setPermissions(_permissions);
      let userSet = userSettings;
      userSet.setting_json.permission = location;
      setUserSetting(userSet);
    } else if (groupName === 'Allow access to camera') {
      let _camera = camera;
      _camera.is_enabled = enable;
      toggleCamera({title: camera.title, is_enabled: enable});
      let _permissions = permissions;
      _permissions.camera = camera;
      setPermissions(_permissions);
      let userSet = userSettings;
      userSet.setting_json.permission = location;
      setUserSetting(userSet);
    } else if (groupName === 'Allow access to microphone') {
      let _microphone = microphone;
      _microphone.is_enabled = enable;
      toggleMicrophone({title: microphone.title, is_enabled: enable});

      let _permissions = permissions;
      _permissions.microphone = microphone;
      setPermissions(_permissions);
      let userSet = userSettings;
      userSet.setting_json.permission = location;
      setUserSetting(userSet);
    } else if (groupName === 'Allow access to health app') {
      let _healthApp = healthApp;
      _healthApp.is_enabled = enable;
      toggleHealthApp({title: healthApp.title, is_enabled: enable});
      let _permissions = permissions;
      _permissions.health_app = healthApp;
      setPermissions(_permissions);
      let userSet = userSettings;
      userSet.setting_json.permission = location;
      setUserSetting(userSet);
    }
    return userSettings;
  };
  return (
    <View>
      <Text style={styles.headingStyle}>Permissions</Text>
      <View style={styles.innerContainer}>
        <SwitchRow
          label={'Allow access to location'}
          onChange={(enable) => {
            createUpdatedObject('Allow access to location', enable).then(
              (res) => {
                if (res) {
                  dispatch(Update_Setting(res));
                }
              },
            );
          }}
          isEnabled={location.is_enabled}
        />
        <SwitchRow
          label={'Allow access to contacts'}
          onChange={(enable) => {
            createUpdatedObject('Allow access to contacts', enable).then(
              (res) => {
                if (res) {
                  dispatch(Update_Setting(res));
                }
              },
            );
          }}
          isEnabled={contacts.is_enabled}
        />
        <SwitchRow
          label={'Allow access to camera'}
          onChange={(enable) => {
            createUpdatedObject('Allow access to camera', enable).then(
              (res) => {
                if (res) {
                  dispatch(Update_Setting(res));
                }
              },
            );
          }}
          isEnabled={camera.is_enabled}
        />
        <SwitchRow
          label={'Allow access to microphone'}
          onChange={(enable) => {
            createUpdatedObject('Allow access to microphone', enable).then(
              (res) => {
                if (res) {
                  dispatch(Update_Setting(res));
                }
              },
            );
          }}
          isEnabled={microphone.is_enabled}
        />
        <SwitchRow
          label={'Allow access to health app'}
          onChange={(enable) => {
            createUpdatedObject('Allow access to health app', enable).then(
              (res) => {
                if (res) {
                  dispatch(Update_Setting(res));
                }
              },
            );
          }}
          isEnabled={healthApp.is_enabled}
        />
      </View>
    </View>
  );
};
