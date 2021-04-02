import {color, isANDROID, normalize} from '../../../Helper/themeHelper';
import moment from 'moment';

export const deleteActionSheet = (
  closeActionSheet = () => {},
  deleteParticipants = () => {},
  length = 0,
) => [
  {
    label:
      length > 1
        ? 'Delete selected participants'
        : 'Delete selected participant',
    labelStyle: {
      color: color.gray,
      fontSize: normalize(10),
    },
  },
  {
    label: length > 1 ? 'Delete participants' : 'Delete participant',
    labelStyle: {
      color: color.red,
    },
    onPress: () => {
      deleteParticipants();
      closeActionSheet();
    },
  },
];

export const exitActionSheet = (
  closeActionSheet = () => {},
  groupName = '',
  exitGroup = () => {},
  muteGroup = () => {},
) => [
  {
    label: `Exit "${groupName}"`,
    labelStyle: {
      color: color.gray,
      fontSize: normalize(10),
    },
  },
  {
    label: 'Exit Group',
    labelStyle: {
      color: color.red,
    },
    onPress: () => {
      exitGroup();
      closeActionSheet();
    },
  },
  {
    label: 'Mute Group Instead',
    labelStyle: {
      color: color.white,
    },
    onPress: () => {
      muteGroup();
      closeActionSheet();
    },
  },
];

export const saveToCameraActionSheet = (closeActionSheet = () => {}) => [
  {
    label: isANDROID
      ? 'Automatically save photos and videos you receive to your Android’s Camera Roll'
      : 'Automatically save photos and videos you receive to your IPhone’s Camera Roll',
    labelStyle: {
      color: color.gray,
      fontSize: normalize(10),
      textAlign: 'center',
    },
  },
  {
    label: 'Default (Off)',
    onPress: () => {
      closeActionSheet();
    },
  },
  {
    label: 'Always',
    onPress: () => {
      closeActionSheet();
    },
  },
  {
    label: 'Never',
    onPress: () => {
      closeActionSheet();
    },
  },
];

export const muteGroupActionSheet = (
  closeActionSheet = () => {},
  fetchTime = () => {},
) => [
  {
    label: '8 hours',
    onPress: () => {
      closeActionSheet();
      let time = new Date(moment().add(8, 'hours'));
      fetchTime(time);
    },
  },
  {
    label: '1 week',
    onPress: () => {
      closeActionSheet();
      let time = new Date(moment().add(7, 'days'));
      fetchTime(time);
    },
  },
  {
    label: '1 year',
    onPress: () => {
      closeActionSheet();
      let time = new Date(moment().add(1, 'years'));
      fetchTime(time);
    },
  },
];

export const clearChatAction = (closeActionSheet = () => {}) => [
  {
    label: 'Delete messages',
    labelStyle: {
      color: color.gray,
      fontSize: normalize(10),
    },
  },
  {
    label: 'Delete all messages',
    labelStyle: {
      color: color.red,
    },
    onPress: () => {
      closeActionSheet();
    },
  },
];
