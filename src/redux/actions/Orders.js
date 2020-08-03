import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const fetchOrders = (token, userId) => async dispatch => {
  // here i choose to use getState that redux-thunk provides along side dispatch
  // i could also pass it as a param

  dispatch({
    type: actionTypes.FETCH_ORDERS_START,
  });

  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

  try {
    const res = await axios.get(`/orders.json${queryParams}`);

    const Orders = [];

    for (let key in res.data) {
      Orders.push({
        ...res.data[key],
        id: key,
      });
    }

    dispatch({
      type: actionTypes.FETCH_ORDERS,
      payload: Orders,
    });
  } catch (err) {
    console.log('orders error', err);
    dispatch({
      type: actionTypes.FETCH_ORDERS_ERROR,
      payload: err,
    });
  }
};
