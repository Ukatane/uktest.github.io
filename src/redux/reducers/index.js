import { combineReducers } from 'redux';
import ingredients from './BurgerBuilder';
import orders from './Orders';
import auth from './auth';

export default combineReducers({
  ingredients,
  orders,
  auth,
});
