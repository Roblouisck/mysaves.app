import axios from 'axios';

export const storeInitialData = (token) => {
  return async (dispatch) => {

    const userIdentityObject = await axios.get ('https://oauth.reddit.com/api/v1/me', {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const userSaves = userSavesObject.data.data.children
    dispatch(storeUserHistory(userSaves))
    dispatch(appendUserHistory(userSaves))
  }
}

  // store first page of user history in state
  // const RetrievedUserHistory = userHistoryObject.data.data.children
  // this.props.storeUserHistory(RetrievedUserHistory) 
  // this.props.appendUserHistory(RetrievedUserHistory)


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