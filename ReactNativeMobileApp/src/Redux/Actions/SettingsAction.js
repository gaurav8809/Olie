import {callApi} from '../Service/apiCall';
import {GET_SETTINGS, IS_METRICS} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';

export const Get_Setting = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.GET_SETTING,
      'get',
      '',
      getAuthToken(state()),
    )
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: GET_SETTINGS,
            payload: res?.data?.setting ?? null,
          });
          return Promise.resolve(res);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const setMetricStatus = (data) => {
  return (dispatch) => {
    dispatch({
      type: IS_METRICS,
      payload: data,
    });
  };
};

export const Update_Setting = (updateSettings) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.UPDATE_SETTING,
      'post',
      updateSettings,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: GET_SETTINGS,
            payload: res?.data?.setting ?? null,
          });
          return Promise.resolve(res);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
