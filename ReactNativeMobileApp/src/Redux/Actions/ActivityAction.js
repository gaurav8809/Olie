import {callApi} from '../Service/apiCall';
import {USER_ACHIEVEMENTS, USER_WEEK_ACTIVITIES} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';

export const FetchActivities = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_USER_ACTIVITIES,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: USER_WEEK_ACTIVITIES,
            payload: res?.data?.data || [],
          });
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.resolve(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const FetchUserAchievements = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_USER_ACHIEVEMENTS,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: USER_ACHIEVEMENTS,
            payload: res?.data?.data || [],
          });
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.resolve(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
