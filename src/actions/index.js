import axios from 'axios';

export const storeInitialData = (token) => {
  return async (dispatch) => {

    const userIdentityObject = await axios.get ('https://oauth.reddit.com/api/v1/me', {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const username = userIdentityObject.data.name
    const userSaves = userSavesObject.data.data.children
    dispatch(storeUserHistory(userSaves))
    dispatch(appendUserHistory(userSaves))
    dispatch(storeUserIdentity(username))
  }
}

export const storeUserIdentity = username => {
  return {
    type: 'USER_IDENTITY',
    payload: username
  }
}

export const storeUserHistory = userData => {
  return {
    type: 'USER_DATA',
    payload: userData
  }
}

export const appendUserHistory = userData => {
  return {
    type: 'APPEND_USER_DATA',
    payload: userData
  }
}