import {
  STORE_USER_TOKEN,
  STORE_USER_IDENTITY,
  STORE_USER_SAVES_TEMPORARILY,
  APPEND_USER_SAVES,
  STORE_USER_SEARCH,
  STORE_SAVE_VALUES_WITH_HTML,
  STORE_SAVE_VALUES_CHRONOLOGICALLY
} from '../actions/types'

const INITIAL_STATE = {
  token: null,
  username: null,
  temporaryUserSaves: [],
  totalUserSaves: [],
  userSearch: 'placehold3r',
  saveValuesWithHTML: [],
  saveValuesChronologically: []
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
    case STORE_SAVE_VALUES_WITH_HTML:
      return {...state, saveValuesWithHTML: action.payload}
    case STORE_SAVE_VALUES_CHRONOLOGICALLY:
      return {...state, saveValuesChronologically: action.payload}

    default:
      return state
  }
}