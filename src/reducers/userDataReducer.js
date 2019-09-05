import {
  STORE_USER_TOKEN,
  STORE_USER_IDENTITY,
  UPDATE_CURRENT_PAGE_SAVES,
  APPEND_USER_SAVES,
  STORE_USER_SEARCH,
  STORE_SAVES_ALPHABETICAL,
  STORE_SAVES_CHRONOLOGICAL,
} from '../actions/types';

const INITIAL_STATE = {
  token: null,
  username: null,
  currentPageOfSaves: [],
  totalUserSaves: [],
  userSearch: 'placehold3r',
  savesAlphabetically: [],
  savesChronologically: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER_TOKEN:
      return { ...state, token: action.payload };
    case STORE_USER_IDENTITY:
      return { ...state, username: action.payload };
    case UPDATE_CURRENT_PAGE_SAVES:
      return { ...state, currentPageOfSaves: action.payload };
    case APPEND_USER_SAVES:
      return {
        ...state,
        totalUserSaves: [...state.totalUserSaves.concat(action.payload)],
      };
    case STORE_USER_SEARCH:
      return { ...state, userSearch: action.payload };
    case STORE_SAVES_ALPHABETICAL:
      return { ...state, savesAlphabetically: action.payload };
    case STORE_SAVES_CHRONOLOGICAL:
      return { ...state, savesChronologically: action.payload };

    default:
      return state;
  }
};
