import {
  STORE_USER_TOKEN,
  STORE_USER_IDENTITY,
  STORE_USER_SAVES,
  APPEND_USER_SAVES
} from '../actions/types'

const INITIAL_STATE = {
  token: null,
  username: null,
  userData: [],
  totalUserData: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_USER_TOKEN:
      return {...state, token: action.payload}
    case STORE_USER_IDENTITY:
      return {...state, username: action.payload}
    case STORE_USER_SAVES:
      return {...state, userData: action.payload}
    case APPEND_USER_SAVES:
      return {...state, totalUserData: [...state.totalUserData.concat(action.payload)] }

    default:
      return state
  }
}