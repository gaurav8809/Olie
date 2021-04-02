import {
  RECENT_LOCATION,
  RIDE_ROUTE,
  SET_FAVOURITE_RIDES,
  SET_RIDE_STATUS,
  SET_RINDING_DETAILS,
  RENTALS,
  FAVOURITE_ROUTES,
  ROUES_BY_USER,
  ROUES_BY_GROUP,
} from '../Types';
import {getAuthToken, GOOGLE_API_KEY} from '../../Helper/appHelper';
import {callApi} from '../Service/apiCall';
import APIConstant from '../Service/apiConstants';
import _ from 'lodash';
export const setRecentLocations = (data) => {
  return (dispatch) => {
    dispatch({
      type: RECENT_LOCATION,
      payload: data,
    });
  };
};

export const setRideRoute = (data) => {

  return (dispatch) => {
    dispatch({
      type: RIDE_ROUTE,
      payload: data,
    });
  };
};

export const setRidingDetails = (data, isReset) => {
  return (dispatch) => {
    dispatch({
      type: SET_RINDING_DETAILS,
      payload: data,
    });
    isReset && dispatch(setRideRoute([]));
  };
};

export const setRideStatus = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_RIDE_STATUS,
      payload: data,
    });
  };
};

//TODO
export const setFavouriteRides = (toggleFav,route_id) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.SET_FAVOURITE_ROUTE + `/`+route_id,
      'post',
      {is_favorite: toggleFav},
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve(res.data);
        } else if (res.error) {
          return Promise.resolve(res.error);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const getPlacesFromText = (text) => {
  return (dispatch) => {
    let searchQuery = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=${GOOGLE_API_KEY}`;
    return fetch(searchQuery)
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 'OK') {
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const getRouteDistance = (origins, destinations) => {

  return (dispatch) => {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations}&key=${GOOGLE_API_KEY}`;
    return fetch(url)
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 'OK') {
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

export const FetchRentals = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_RENTALS,
      'get',
      {},
      getAuthToken(state()),
      {'Content-Type': 'application/x-www-form-urlencoded'},
    )
      .then((res) => {
        if (res?.data?.success) {
          ;
          dispatch({
            type: RENTALS,
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

//TODO
export const FetchFavoriteRouteByUser = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_FAVORITE_ROUTES_BY_USER,
      'get',
      {},
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: FAVOURITE_ROUTES,
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

//TODO
export const FetchRoutesByUser = () => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_ROUTES,
      'get',
      {},
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: ROUES_BY_USER,
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

//TODO
export const FetchRoutesByGroup = (groupId) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.FETCH_GROUP_ROUTES + `/${groupId}`,
      'get',
      {},
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          dispatch({
            type: ROUES_BY_GROUP,
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

//TODO
export const CreateRoute = (data) => {

  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.CREATE_ROUTES,
      'post',
      data,
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve({
            result: res.data.data,
            success: res?.data?.success,
          });
        } else if (res.error) {
          return Promise.resolve({error: res.error});
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};


//TODO
export const CreateActivity = (data) => {
  return (dispatch, state) => {
    return callApi(
      APIConstant.BASE_URL + APIConstant.CREATE_ACTIVITY,
      'post',
      data,
      getAuthToken(state()),
      {'Content-Type': 'application/json'},
    )
      .then((res) => {
        if (res?.data?.success) {
          return Promise.resolve({
            result: res.data.data,
            success: res?.data?.success,
          });
        } else if (res.error) {
          return Promise.resolve({error: res.error});
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
