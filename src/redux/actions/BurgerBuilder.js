import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const initialIngredients = () => async dispatch => {
  try {
    const res = await axios.get('/ingredients.json');

    dispatch({
      type: actionTypes.INITIAL_INGREDIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.BURGER_BUILDER_ERROR,
    });
  }
};

export const addIngredients = payload => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload,
  };
};

export const removeIngredients = payload => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload,
  };
};
