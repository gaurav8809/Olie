import {BEST_RIDE, RECENT_RIDE} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.profile;

export default (state = initialState, action) => {
  switch (action.type) {
    case RECENT_RIDE: {
      return {
        ...state,
        recentRide: action.payload,
      };
    }
    case BEST_RIDE: {
      return {
        ...state,
        bestRide: action.payload,
      };
    }

    default:
      return state;
  }
};
