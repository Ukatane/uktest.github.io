import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const fetchOrders = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    orders: payload,
    error: null,
    loading: false,
  };
};

const fetchOrdersError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS:
      return fetchOrders(state, action);
    case actionTypes.FETCH_ORDERS_ERROR:
      return fetchOrdersError(state, action);
    default:
      return state;
  }
};
