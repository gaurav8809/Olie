import {callApi} from '../Service/apiCall';
import {USER_DETAIL, RESET_STORE, REMEMBER_ME, AUTH_TOKEN} from '../Types';
import APIConstant from './../Service/apiConstants';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {getAuthToken} from '../../Helper/appHelper';

export const SignUpUser = (userData) => {
  return (dispatch) => {
    return callApi(APIConstant.BASE_URL + APIConstant.SIGN_UP, 'post', userData)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: USER_DETAIL,
            payload: {...res?.data?.data, device_id: userData?.device_id ?? ''},
          });
          dispatch({
            type: AUTH_TOKEN,
            payload: res?.headers?.auth_token ?? null,
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

export const LogInUser = (userData) => {
  return (dispatch) => {
    return callApi(APIConstant.BASE_URL + APIConstant.LOGIN, 'post', userData)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: USER_DETAIL,
            payload: {...res?.data?.data, device_id: userData?.device_id ?? ''},
          });
          dispatch({
            type: AUTH_TOKEN,
            payload: res?.headers?.auth_token ?? null,
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

export const RemoveDeviceId = (device_id) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.SIGN_OUT,
      'post',
      {
        device_id: device_id,
      },
      getAuthToken(state()),
    )
      .then((res) => {
        if (res.data.success) {
          return Promise.resolve(true);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const SignOut = () => {
  return async (dispatch, state) => {
    const AfterSignOut = () => {
      LoginManager.logOut();
      GoogleSignin.signOut();
      dispatch({
        type: RESET_STORE,
      });
      return true;
    };

    let device_id = state()?.user?.userDetail?.device_id ?? null;
    if (device_id) {
      return dispatch(RemoveDeviceId(device_id))
        .then((res) => {
          if (res) {
            return AfterSignOut();
          } else {
            return Promise.reject(true);
          }
        })
        .catch((e) => {
          return Promise.reject(true);
        });
    } else {
      await AfterSignOut();
      return Promise.resolve(true);
    }
  };
};
export const RegisterExternalSignIn = (userData) => {
  return (dispatch) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.REGISTER_EXTERNAL_LOGIN,
      'post',
      userData,
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: USER_DETAIL,
            payload: {...res?.data?.data, device_id: userData?.device_id ?? ''},
          });
          dispatch({
            type: AUTH_TOKEN,
            payload: res?.headers?.auth_token ?? null,
          });
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.reject(res.data);
        } else if (res === true) {
          return Promise.resolve({alreadyLogged: true});
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
export const ExternalSignIn = (userData) => {
  return (dispatch) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.EXTERNAL_LOGIN,
      'post',
      userData,
    )
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: USER_DETAIL,
            payload: {...res?.data?.data, device_id: userData?.device_id ?? ''},
          });
          dispatch({
            type: AUTH_TOKEN,
            payload: res?.headers?.auth_token ?? null,
          });
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
export const FetchUserData = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_USER_DETAILS,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res.data.success) {
          const userData = state().user.userDetail;
          dispatch({
            type: USER_DETAIL,
            payload: {...userData, ...res?.data?.data},
          });
          return Promise.resolve(res.data.data);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const updateRememberData = (data) => {
  return (dispatch) => {
    dispatch({
      type: REMEMBER_ME,
      payload: data,
    });
  };
};

export const EditUserData = (data) => {
  console.log(data);
  return (dispatch, state) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return callApi(
      APIConstant.BASE_URL + APIConstant.EDIT_PROFILE,
      'post',
      formData,
      getAuthToken(state()),
      {'Content-Type': 'multipart/form-data'},
    )
      .then((res) => {
        if (res?.data?.success) {
          const userData = state().user.userDetail;
          dispatch({
            type: USER_DETAIL,
            payload: {...userData, ...res?.data?.data},
          });
          return Promise.resolve(true);
        } else if (res.error) {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
