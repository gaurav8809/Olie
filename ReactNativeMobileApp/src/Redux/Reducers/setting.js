import {GET_SETTINGS} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.navigation;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return {
        ...state,
        settingDetails: action.payload,
      };
    }

    default:
      return state;
  }
};
