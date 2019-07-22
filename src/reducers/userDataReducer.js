import {
  TOKEN,
  USER_IDENTITY,
  USER_DATA,
  APPEND_USER_DATA
} from '../actions/types'

const INITIAL_STATE = {
  token: null,
  username: null,
  userData: [],
  totalUserData: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOKEN:
      return {...state, token: action.payload}
    case USER_IDENTITY:
      return {...state, username: action.payload}
    case USER_DATA:
      return {...state, userData: action.payload}
    case APPEND_USER_DATA:
      return {...state, totalUserData: [...state.totalUserData.concat(action.payload)] }

    default:
      return state
  }
}