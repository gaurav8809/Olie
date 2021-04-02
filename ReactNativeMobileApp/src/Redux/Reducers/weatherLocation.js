import {CURRENT_LOCATION} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.weatherLocation;
export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    default:
      return state;
  }
};
