import {
  DISPLAY_THREADS_AND_COMMENTS,
  DISPLAY_ONLY_THREADS,
  DISPLAY_ONLY_COMMENTS
} from '../actions/types'

const INITIAL_STATE = {
  displayThreadsAndComments: true,
  displayOnlyThreads: false,
  displayOnlyComments: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DISPLAY_THREADS_AND_COMMENTS:
      return {...state, displayThreadsAndComments: action.payload, displayOnlyThreads: false, displayOnlyComments: false}
    case DISPLAY_ONLY_THREADS:
      return {...state, displayThreadsAndComments: false, displayOnlyThreads: action.payload, displayOnlyComments: false}
    case DISPLAY_ONLY_COMMENTS:
      return {...state, displayThreadsAndComments: false, displayOnlyThreads: false, displayOnlyComments: action.payload}
    default:
      return state
  }
}