import {
  SET_PAGINATION
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type) {
    case SET_PAGINATION:
      return {...state, runAutoPagination: action.payload}

    default:
      return state
  }
}