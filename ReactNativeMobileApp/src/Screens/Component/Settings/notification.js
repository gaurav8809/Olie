import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {SwitchRow} from './switchRow';
import {Update_Setting} from '../../../Redux/Actions/SettingsAction';
import {useDispatch, useSelector} from 'react-redux';

export const Notification = (props) => {
  const dispatch = useDispatch();
  const settingData = useSelector((state) => state.setting.settingDetails);
  const [onlineGroups, toggleOnlineGroups] = useState({
    title:
      settingData &&
      settingData.notifications &&
      settingData.notifications.online_groups.title,
    is_enabled:
      settingData &&
      settingData.notifications &&
      settingData.notifications.online_groups.is_enabled,
  });
  const [messageOnChat, toggleMessageOnChat] = useState({
    title:
      settingData &&
      settingData.notifications &&
      settingData.notifications.messages_on_chat.title,
    is_enabled:
      settingData &&
      settingData.notifications &&
      settingData.notifications.messages_on_chat.is_enabled,
  });
  const [email, toggleEmail] = useState({
    title:
      settingData &&
      settingData.notifications &&
      settingData.notifications.email_notification.title,
    is_enabled:
      settingData &&
      settingData.notifications &&
      settingData.notifications.email_notification.is_enabled,
  });
  const [userSettings, setUserSetting] = useState({setting_json: settingData});
  const [notification, setNotification] = useState(
    settingData && settingData.notifications,
  );

  const createUpdatedObject = async (groupName, enable) => {
    if (groupName === 'Online groups') {
      let online_grp = onlineGroups;
      online_grp.is_enabled = enable;
      toggleOnlineGroups({title: onlineGroups.title, is_enabled: enable});

      let notificationDt = notification;
      notificationDt.online_groups = onlineGroups;
      setNotification(notificationDt);
      let userSet = userSettings;
      userSet.setting_json.notifications = notification;
      setUserSetting(userSet);
    } else if (groupName === 'Messages on chat') {
      let messages_on_chat = messageOnChat;
      messages_on_chat.is_enabled = enable;
      toggleMessageOnChat({title: messageOnChat.title, is_enabled: enable});

      let notificationDt = notification;
      notificationDt.messages_on_chat = messageOnChat;
      setNotification(notificationDt);
      let userSet = userSettings;
      userSet.setting_json.notifications = notification;
      setUserSetting(userSet);
    } else if (groupName === 'Email me events, offers and updates') {
      let _email = email;
      _email.is_enabled = enable;
      toggleEmail({title: email.title, is_enabled: enable});

      let notificationDt = notification;
      notificationDt.email_notification = _email;
      setNotification(notificationDt);
      let userSet = userSettings;
      userSet.setting_json.notifications = notification;
      setUserSetting(userSet);
    }
    return userSettings;
  };
  return (
    <View>
      <Text style={styles.headingStyle}>Notifications</Text>
      <View style={styles.innerContainer}>
        <SwitchRow
          label={'Online groups'}
          onChange={(enable) => {
            createUpdatedObject('Online groups', enable).then((res) => {
              if (res) {
                dispatch(Update_Setting(res));
              }
            });
          }}
          isEnabled={onlineGroups.is_enabled}
          // isEnabled={(enable) => {
          //   toggleOnlineGroups({...onlineGroups, is_enabled: enable});
          // }}
        />
        <SwitchRow
          label={'Messages on chat'}
          onChange={(enable) => {
            createUpdatedObject('Messages on chat', enable).then((res) => {
              if (res) {
                dispatch(Update_Setting(res));
              }
            });
          }}
          isEnabled={messageOnChat.is_enabled}
        />

        <SwitchRow
          label={'Email me events, offers and updates'}
          onChange={(enable) => {
            createUpdatedObject(
              'Email me events, offers and updates',
              enable,
            ).then((res) => {
              if (res) {
                dispatch(Update_Setting(res));
              }
            });
          }}
          isEnabled={email.is_enabled}
        />
      </View>
    </View>
  );
};
