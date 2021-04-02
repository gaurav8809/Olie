import {USER_ACHIEVEMENTS, USER_WEEK_ACTIVITIES} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.activities;

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_WEEK_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case USER_ACHIEVEMENTS: {
      return {
        ...state,
        achievements: action.payload,
      };
    }

    default:
      return state;
  }
};
