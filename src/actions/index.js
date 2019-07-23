import axios from 'axios';
import {
  SET_PAGINATION,
  STORE_USER_TOKEN,
  STORE_USER_IDENTITY,
  STORE_USER_SAVES,
  APPEND_USER_SAVES
} from './types'

export const fetchInitialUserData = (token) => {
  return async (dispatch) => {
    const userIdentityObject = await axios.get ('https://oauth.reddit.com/api/v1/me', {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const username = userIdentityObject.data.name
    const userSaves = userSavesObject.data.data.children
    dispatch(storeUserSaves(userSaves))
    dispatch(appendUserSaves(userSaves))
    dispatch(setPagination(true))
    dispatch(storeUserIdentity(username))
  }
}

export const storeUserToken = token => {
  return {
    type: STORE_USER_TOKEN,
    payload: token
  }
}

export const setPagination = boolean => {
  return {
    type: SET_PAGINATION,
    payload: boolean
  }
}

export const storeUserIdentity = username => {
  return {
    type: STORE_USER_IDENTITY,
    payload: username
  }
}

export const storeUserSaves = userSaves => {
  return {
    type: STORE_USER_SAVES,
    payload: userSaves
  }
}

export const appendUserSaves = userSaves => {
  return {
    type: APPEND_USER_SAVES,
    payload: userSaves
  }
}