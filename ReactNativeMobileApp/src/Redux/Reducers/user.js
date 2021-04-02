import {REMEMBER_ME, USER_DETAIL, AUTH_TOKEN} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.user;

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAIL: {
      return {
        ...state,
        userDetail: action.payload,
      };
    }
    case REMEMBER_ME: {
      return {
        ...state,
        rememberData: action.payload,
      };
    }
    case AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.payload,
      };
    }
    default:
      return state;
  }
};
