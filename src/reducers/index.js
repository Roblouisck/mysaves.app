import { combineReducers } from 'redux';

export const UserHistoryReducer = (userData=[], action) => {
  if (action.type === 'USER_DATA') {
    return action.payload
  }
  return userData;
}

export const AppendUserHistoryReducer = (userData=[], action) => {
  if (action.type === 'APPEND_USER_DATA') {
    return [...userData, action.payload]
  }
  return userData;
}

// user state is set here
export default combineReducers({
  userHistory: UserHistoryReducer,
  totalUserHistory: AppendUserHistoryReducer
});