import {callApi} from '../Service/apiCall';
import {FIND_FRIENDS_LIST, OLIE_FRIENDS, OLIE_CONTACT_LIST} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';
import _ from 'lodash';

export const FetchFriends = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_FRIENDS,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          let contactArray = _.map(
            _.groupBy(
              res?.data?.data,
              (x) =>
                x?.user?.user_name &&
                x?.user?.user_name !== '' &&
                x?.user?.user_name[0].toUpperCase(),
            ),
            (val, key) => {
              return {
                title: key.toUpperCase(),
                data: _.sortBy(val, [(x) => x]),
              };
            },
          );
          contactArray = _.sortBy(contactArray, ['title']);
          dispatch({
            type: OLIE_FRIENDS,
            payload: contactArray || [],
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

export const FindFriendsAction = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FIND_FRIENDS,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          let friendsList = _.map(
            _.groupBy(
              res?.data?.data,
              (x) =>
                x?.displayName &&
                x?.displayName !== '' &&
                x?.displayName[0].toUpperCase(),
            ),
            (val, key) => {
              return {
                title: key.toUpperCase(),
                data: _.sortBy(val, [(x) => x]),
              };
            },
          );
          friendsList = _.sortBy(friendsList, ['title']);
          dispatch({
            type: FIND_FRIENDS_LIST,
            payload: friendsList,
          });
          dispatch({
            type: OLIE_CONTACT_LIST,
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

export const AddFriendsAction = (data, helperData) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.ADD_FRIENDS,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
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

export const AddFriendByPhone = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.ADD_BY_PHONE,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
export const AddFriendByEmail = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.ADD_BY_EMAIL,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {

        if (res?.data?.success) {

          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
