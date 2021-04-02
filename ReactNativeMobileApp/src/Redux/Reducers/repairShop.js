import {REPAIR_SHOP} from '../Types';
import {appDefaultReducer} from './Default';

const initialState = appDefaultReducer.repairShop;
export default (state = initialState, action) => {
  switch (action.type) {
    case REPAIR_SHOP: {
      return {
        ...state,
        repairShopData: action.payload,
      };
    }
    default:
      return state;
  }
};
