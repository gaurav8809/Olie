import {color, normalize} from '../../../../Helper/themeHelper';

export const createGroupsActionSheet = (selectRideType = () => {}) => [
  {
    label: 'Create',
    onPress: () => {},
    labelStyle: {
      flex: 1,
      color: color.gray,
      fontSize: normalize(10),
      textAlign: 'center',
    },
  },
  {
    label: 'Sponsored Ride Out',
    onPress: () => {
      selectRideType(0);
    },
    labelStyle: {
      flex: 1,
      textAlign: 'center',
    },
  },
  {
    label: 'Ride Out',
    onPress: () => {
      selectRideType(1);
    },
    labelStyle: {
      flex: 1,
      textAlign: 'center',
    },
  },
];
