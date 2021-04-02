import {callApi} from '../Service/apiCall';
import {RECENT_RIDE, BEST_RIDE} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';

export const FetchRecentRide = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_USER_RECENT_RIDE,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: RECENT_RIDE,
            payload: res?.data?.data ?? null,
          });
          return Promise.resolve(res?.data);
        } else if (res.error) {
          return Promise.reject(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const FetchBestRide = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_USER_BEST_RIDE,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: BEST_RIDE,
            payload: res?.data?.data ?? null,
          });
          return Promise.resolve(res?.data);
        } else if (res.error) {
          return Promise.reject(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
