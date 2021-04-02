import {combineReducers} from 'redux';
import {RESET_STORE} from '../Types';
import {appDefaultReducer} from './Default';
import user from './user';
import navigation from './navigation';
import weatherLocation from './weatherLocation';
import system from './system';
import setting from './setting';
import friends from './friends';
import groups from './groups';
import repairShop from './repairShop';
import challenges from './challenges';
import activities from './activities';
import profile from './profile';
import conversions from './conversions';

export const appReducer = combineReducers({
  user,
  navigation,
  weatherLocation,
  system,
  setting,
  friends,
  groups,
  repairShop,
  challenges,
  activities,
  profile,
  conversions,
});

export default function rootReducer(state, action) {
  const finalReducer = appReducer(state, action);
  let finalState = finalReducer;
  if (action.type === RESET_STORE) {
    finalState = appDefaultReducer;
    finalState.user.rememberData = finalReducer.user.rememberData;
  }

  return finalState;
}
