import axios from 'axios';
import NetworkUtils from '../../NetworkUtils/NetworkUtils';
import {Alert} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

const handleResponse = (url, response, meth) => {
  if (response?.data?.invalid_token) {
    Alert.alert(
      'Invalid User',
      response?.data?.message,
      [
        {
          text: 'Log out',
          onPress: () => EventRegister.emit('LogoutEvent', 'it works!!!'),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  }
  if (response?.data?.error) {
    if (__DEV__) {
      console.log('Something went wrong error - ', url, response?.data);
    }
    // alert('Something went wrong');
    return true;
  }
  if (response?.data?.success === true) {
    if (__DEV__) {
      console.log('--response-- ', url, '--', response.data);
    }
    return Promise.resolve(response);
  } else if (response?.data?.success === false) {
    alert(response.data.message);
    return true;
  }
};

const handleCatchError = (url, err) => {
  NetworkUtils.isNetworkAvailable().then((res) => {
    console.log(res);
    if (!res) {
      Alert.alert(
        'Error in Loading Contents',
        'Please Check your internet connection We cannot move without internet connection',
        [
          {
            text: 'Retry',
            onPress: () => {
              // isAlertShown = false;
            },
          },
        ],
        {cancelable: true},
      );
    }
  });
  if (__DEV__) {
    console.log('call api error - ', url, err);
  }

  return Promise.reject(err);
};

export function callApi(url, type = 'get', data = {}, token = '', header = {}) {
  let reqHeader = Object.assign(header, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // auth_token: header ? header : '',
    auth_token: token,
  });
  if (__DEV__) {
    console.log('URL - ', url);
  }

  if (type === 'get') {
    return axios
      .get(url, {headers: reqHeader})
      .then((response) => {
        return handleResponse(url, response, 'get');
      })
      .catch((err) => {
        return handleCatchError(url, err);
      });
  } else if (type === 'post') {
    return axios
      .post(url, data, {headers: reqHeader})
      .then((response) => {
        return handleResponse(url, response, 'post');
      })
      .catch((err) => {
        return handleCatchError(url, err);
      });
  } else if (type === 'patch') {
    return axios
      .patch(url, data, {headers: reqHeader})
      .then((response) => {
        return handleResponse(url, response, 'patch');
      })
      .catch((err) => {
        return handleCatchError(url, err);
      });
  }
}
