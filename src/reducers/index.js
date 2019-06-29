import { combineReducers } from 'redux';

export const usernameReducer = (username=null, action) => {
  if (action.type === 'USER_IDENTITY') {
    return action.payload
  }
  return username;
}

export const UserHistoryReducer = (userData=[], action) => {
  if (action.type === 'USER_DATA') {
    return action.payload
  }
  return userData;
}

export const AppendUserHistoryReducer = (userData=[], action) => {
  if (action.type === 'APPEND_USER_DATA') {
    return  [...userData.concat(action.payload)] 
  }
  return userData;
}

// user state is set here
export default combineReducers({
  username: usernameReducer,
  userHistory: UserHistoryReducer,
  totalUserHistory: AppendUserHistoryReducer
});