import {callApi} from '../Service/apiCall';
import {CHALLENGES, NEW_CHALLENGES, POPULAR_CHALLENGES} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';

export const FetchChallenges = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_CHALLENGES,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: CHALLENGES,
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

export const FetchPopularChallenges = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_POPULAR_CHALLENGES,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: POPULAR_CHALLENGES,
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

export const FetchNewChallenges = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_NEW_CHALLENGES,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: NEW_CHALLENGES,
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

export const SubscribeChallenge = (challengeId) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL +
        APIConstant.SUBSCRIPT_CHALLENGE_BY_ID +
        `/${challengeId}`,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res?.data);
        } else if (res.error) {
          return Promise.resolve(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
