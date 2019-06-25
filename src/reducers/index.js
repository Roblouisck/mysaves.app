import { combineReducers } from 'redux';

export const UserHistoryReducer = (userData=[], action) => {
  if (action.type === 'USER_DATA') {
    return action.payload;
  }
  return userData;
}

// user state is set here
export default combineReducers({
  userHistory: UserHistoryReducer 
});