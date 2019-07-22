import { combineReducers } from 'redux';
import paginationReducer from './paginationReducer'
import userDataReducer from './userDataReducer'

// user state is set here
export default combineReducers({
  pagination: paginationReducer,
  userData: userDataReducer
});