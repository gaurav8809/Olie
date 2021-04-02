import {color, normalize} from '../../../Helper/themeHelper';

export const exitActionSheet = (
  closeActionSheet = () => {},
  groupName = '',
  exitGroup = () => {},
  muteGroup = () => {},
) => [
  {
    label: `Exit ${groupName}`,
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
    label:
      'Automatically save photos and videos you receive to your IPhone’s Camera Roll',
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

export const muteGroupActionSheet = (closeActionSheet = () => {}) => [
  {
    label: '8 hours',
    onPress: () => {
      closeActionSheet();
    },
  },
  {
    label: '1 week',
    onPress: () => {
      closeActionSheet();
    },
  },
  {
    label: '1 year',
    onPress: () => {
      closeActionSheet();
    },
  },
];
