import { combineReducers } from 'redux';
import paginationReducer from './paginationReducer';
import userDataReducer from './userDataReducer';
import buttonsReducer from './buttonsReducer';

// user state is set here
export default combineReducers({
  pagination: paginationReducer,
  userData: userDataReducer,
  buttons: buttonsReducer
});
