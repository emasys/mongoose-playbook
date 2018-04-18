import { combineReducers } from 'redux';
import todos from './todoReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  todos,
  auth,
});

export default rootReducer;
