import {SET_BOTTOM_TAB_MIDDLE_BUTTON_INFO, BOTTOM_TAB_VISIBLE} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.system;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOTTOM_TAB_MIDDLE_BUTTON_INFO: {
      return {
        ...state,
        bottomTabMiddleButtonInfo: action.payload,
      };
    }
    case BOTTOM_TAB_VISIBLE: {
      return {
        ...state,
        bottomTabVisible: action.payload,
      };
    }
    default:
      return state;
  }
};
