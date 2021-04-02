import {OLIE_FRIENDS, FIND_FRIENDS_LIST, OLIE_CONTACT_LIST} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.friends;

export default (state = initialState, action) => {
  switch (action.type) {
    case OLIE_FRIENDS: {
      return {
        ...state,
        olieFriends: action.payload,
      };
    }
    case FIND_FRIENDS_LIST: {
      return {
        ...state,
        findFriendsList: action.payload,
      };
    }
    case OLIE_CONTACT_LIST: {
      return {
        ...state,
        olieContactList: action.payload,
      };
    }
    default:
      return state;
  }
};
