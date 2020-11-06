import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  error: errorReducer
});

export default rootReducer;