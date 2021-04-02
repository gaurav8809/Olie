import {
  FAVOURITE_ROUTES,
  RECENT_LOCATION,
  RENTALS,
  RIDE_ROUTE,
  ROUES_BY_GROUP,
  ROUES_BY_USER,
  SET_FAVOURITE_RIDES,
  SET_RIDE_STATUS,
  SET_RINDING_DETAILS,
} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.navigation;

export default (state = initialState, action) => {
  switch (action.type) {
    case RECENT_LOCATION: {
      return {
        ...state,
        recentLocation: action.payload,
      };
    }
    case RIDE_ROUTE: {
      return {
        ...state,
        rideRoute: action.payload,
      };
    }
    case SET_RINDING_DETAILS: {
      return {
        ...state,
        ridingDetails: action.payload,
      };
    }
    case SET_RIDE_STATUS: {
      return {
        ...state,
        ridingDetails: {
          ...state.ridingDetails,
          status: action.payload,
        },
      };
    }
    //TODO- Reducer already created but need to manage with API integration
    case SET_FAVOURITE_RIDES: {
      return {
        ...state,
        favouriteRides: action.payload,
      };
    }
    case RENTALS: {
      return {
        ...state,
        rentalsData: action.payload,
      };
    }
    //TODO- need to manage with SET_FAVOURITE_RIDES-favouriteRides in SetLocationScreen.js
    case FAVOURITE_ROUTES: {
      return {
        ...state,
        favouriteRoutesList: action.payload,
      };
    }
    //TODO
    case ROUES_BY_USER: {
      return {
        ...state,
        userRoutesList: action.payload,
      };
    }
    //TODO
    case ROUES_BY_GROUP: {
      return {
        ...state,
        groupRoutesList: action.payload,
      };
    }
    default:
      return state;
  }
};
