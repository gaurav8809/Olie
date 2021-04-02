import {CHALLENGES, NEW_CHALLENGES, POPULAR_CHALLENGES} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.challenges;

export default (state = initialState, action) => {
  switch (action.type) {
    case CHALLENGES: {
      return {
        ...state,
        challenges: action.payload,
      };
    }
    case POPULAR_CHALLENGES: {
      return {
        ...state,
        popularChallenges: action.payload,
      };
    }
    case NEW_CHALLENGES: {
      return {
        ...state,
        newChallenges: action.payload,
      };
    }
    default:
      return state;
  }
};
