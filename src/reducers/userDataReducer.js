import {
  STORE_USER_TOKEN,
  STORE_USER_IDENTITY,
  STORE_USER_SAVES_TEMPORARILY,
  APPEND_USER_SAVES,
  STORE_USER_SEARCH,
  STORE_IMPORTANT_SAVE_VALUES
} from '../actions/types'

const INITIAL_STATE = {
  token: null,
  username: null,
  temporaryUserSaves: [],
  totalUserSaves: [],
  userSearch: 'placehold3r',
  importantSaveValues: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_USER_TOKEN:
      return {...state, token: action.payload}
    case STORE_USER_IDENTITY:
      return {...state, username: action.payload}
    case STORE_USER_SAVES_TEMPORARILY:
      return {...state, temporaryUserSaves: action.payload}    
    case APPEND_USER_SAVES:
      return {...state, totalUserSaves: [...state.totalUserSaves.concat(action.payload)] }
    case STORE_USER_SEARCH:
      return {...state, userSearch: action.payload}
    case STORE_IMPORTANT_SAVE_VALUES:
      return {...state, importantSaveValues: action.payload}

    default:
      return state
  }
}