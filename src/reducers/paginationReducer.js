import {
  PAGINATION
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type) {
    case PAGINATION:
      return {...state, runPagination: action.payload}

    default:
      return state
  }
}