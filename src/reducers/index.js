import { combineReducers } from 'redux';

export const TokenReducer = (token=null, action) => {
  if (action.type === 'TOKEN') {
    return action.payload
  }
  return token;
}
export const AutoPaginationReducer = (boolean=false, action) => {
  if (action.type === 'PAGINATION') {
    return action.payload
  }
  return boolean;
}

export const UsernameReducer = (username=null, action) => {
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
  username: UsernameReducer,
  userHistory: UserHistoryReducer,
  totalUserHistory: AppendUserHistoryReducer,
  runAutoPagination: AutoPaginationReducer,
  token: TokenReducer
});