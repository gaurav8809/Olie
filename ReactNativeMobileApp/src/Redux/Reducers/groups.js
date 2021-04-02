import {GROUP_LIST, GROUP_RIDEOUT_LIST} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.groups;

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUP_LIST: {
      return {
        ...state,
        groupList: action.payload,
      };
    }
    case GROUP_RIDEOUT_LIST: {
      return {
        ...state,
        groupRideoutList: action.payload,
      };
    }
    default:
      return state;
  }
};
