import {
    CURRENT_LOCATION,
} from '../Types';

export const setCurrentLocation = (data) => {
    return (dispatch) => {
        dispatch({
            type: CURRENT_LOCATION,
            payload: data,
        });
    };
};
