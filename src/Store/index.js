import { reducerConsoleLogger } from 'Lib/utils';

export const initialState = {
  user: undefined,
  errors: [],
  snacks: undefined,
  cart: [],
  orders: undefined,
};

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const ERRORS_DISMISSED = 'ERRORS_DISMISSED';
export const SNACKS_DATA_LOADED = 'SNACKS_DATA_LOADED';
export const ORDERS_DATA_LOADED = 'ORDERS_DATA_LOADED';
export const ITEM_ADDED = 'ITEM_ADDED';
export const ITEM_REMOVED = 'ITEM_REMOVED';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case ERROR_OCCURRED:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };

    case ERRORS_DISMISSED:
      return {
        ...state,
        errors: [],
      };

    case SNACKS_DATA_LOADED:
      return {
        ...state,
        snacks: action.payload,
      };

    case ORDERS_DATA_LOADED:
      return {
        ...state,
        orders: action.payload,
      };

    case ITEM_ADDED:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case ITEM_REMOVED:
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== action.payload),
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducerConsoleLogger(reducer);
