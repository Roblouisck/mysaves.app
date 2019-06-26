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