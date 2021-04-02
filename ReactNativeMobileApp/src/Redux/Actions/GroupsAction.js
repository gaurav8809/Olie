import {callApi} from '../Service/apiCall';
import {GROUP_LIST, GROUP_RIDEOUT_LIST} from '../Types';
import APIConstant from './../Service/apiConstants';
import {getAuthToken} from '../../Helper/appHelper';
import _ from 'lodash';

export const FetchGroups = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_GROUPS,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          let data = _.sortBy(
            res?.data?.data,
            (x) => new Date(x?.group?.display_time),
          );
          dispatch({
            type: GROUP_LIST,
            payload: data.reverse() || [],
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

export const FetchGroupRideOuts = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_GROUP_RIDEOUTS,
      'get',
      {},
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: GROUP_RIDEOUT_LIST,
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

export const CreateGroup = (data) => {
  return (dispatch, state) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return callApi(
      APIConstant.BASE_URL + APIConstant.CREATE_GROUP,
      'post',
      formData,
      getAuthToken(state()),
      {'Content-Type': 'multipart/form-data'},
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch(FetchGroups());
          return Promise.resolve(res?.data?.success);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const updateGroup = (data, groupId) => {
  return (dispatch, state) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return callApi(
      APIConstant.BASE_URL + APIConstant.UPDATE_GROUP + groupId,
      'post',
      formData,
      getAuthToken(state()),
      {'Content-Type': 'multipart/form-data'},
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const UploadFileInChat = (data) => {
  return (dispatch, state) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(JSON.stringify(data));
    return callApi(
      APIConstant.BASE_URL + APIConstant.UPLOAD_FILE_CHAT,
      'post',
      formData,
      getAuthToken(state()),
      {'Content-Type': 'multipart/form-data'},
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res?.data?.data);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const updateParticipant = (pData) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.UPDATE_PARTICIPANTS,
      'post',
      pData,
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

export const updateAddAdmin = (pData) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.UPDATE_ADD_ADMIN,
      'post',
      pData,
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

export const FetchGroupMedia = (groupid) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_GROUP_MEDIA + groupid,
      'get',
      {},
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

export const ClearGroupChat = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.CLEAR_CHAT,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          alert(res?.data?.message);
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
export const ExitGroup = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.EXIT_GROUP,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch(FetchGroups());
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

export const MuteGroup = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.MUTE_GROUP,
      'post',
      data,
      getAuthToken(state()),
    )
      .then((res) => {
        if (res?.data?.success) {
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
