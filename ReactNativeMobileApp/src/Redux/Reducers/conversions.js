import {IS_METRICS} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.conversions;

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_METRICS: {
      return {
        ...state,
        isMetric: action.payload,
      };
    }

    default:
      return state;
  }
};
