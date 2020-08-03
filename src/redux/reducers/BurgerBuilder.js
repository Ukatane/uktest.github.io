import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  loading: true,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  meat: 1.5,
  bacon: 1.3,
};

const initialIngredients = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    ingredients: payload,
    totalPrice: 4,
    error: false,
    loading: false,
    building: false,
  };
};

const addIngredients = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload]: state.ingredients[payload] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload],
    error: false,
    loading: false,
    building: true,
  };
};

const removeIngredients = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [payload]: state.ingredients[payload] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[payload],
    error: false,
    loading: false,
    building: true,
  };
};

const burgerBuilderError = (state, action) => {
  return {
    ...state,
    error: true,
    loading: false,
    building: false,
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.INITIAL_INGREDIENTS:
      return initialIngredients(state, action);
    case actionTypes.ADD_INGREDIENT:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredients(state, action);
    case actionTypes.BURGER_BUILDER_ERROR:
      return burgerBuilderError(state, action);
    default:
      return state;
  }
};
