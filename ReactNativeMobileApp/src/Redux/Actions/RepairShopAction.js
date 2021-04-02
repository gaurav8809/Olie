import {callApi} from '../Service/apiCall';
import {AUTH_TOKEN, REPAIR_SHOP, USER_DETAIL} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';

export const FetchRepairShop = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_REPAIR_SHOP,
      'get',
      {},
      getAuthToken(state()),
      {'Content-Type': 'application/x-www-form-urlencoded'},
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log('success');
          dispatch({
            type: REPAIR_SHOP,
            payload: res?.data?.data ?? [],
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

export const FetchNearestShops = (data) => {
  console.log('--loc data--', data);
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_NEAREST_SHOPS,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res);
        } else {
          return Promise.resolve(res);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
