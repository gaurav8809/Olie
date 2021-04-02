import {SET_BOTTOM_TAB_MIDDLE_BUTTON_INFO, BOTTOM_TAB_VISIBLE} from '../Types';

export const setBottomTabMiddleButtonInfo = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_BOTTOM_TAB_MIDDLE_BUTTON_INFO,
      payload: data,
    });
  };
};

export const setBottomTabVisibility = (data = true) => {
  return (dispatch) => {
    return dispatch({
      type: BOTTOM_TAB_VISIBLE,
      payload: data,
    });
  };
};
