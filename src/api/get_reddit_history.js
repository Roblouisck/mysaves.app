import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { storeUserHistory } from '../actions/index.js'
import ListSaved from '../components/ListSaved'

class RedditUserData extends React.Component {

  // Retrieving our reddit api access token from the current url
  async componentDidMount (props) {
  const params = new URLSearchParams(this.props.location.hash);
  const token = params.get('#access_token')

  // Axios requests to reddit API
  const userIdentityObject = await axios.get ('https://oauth.reddit.com/api/v1/me', {
    headers: { 'Authorization': `bearer ${token}` }
  })
  const userHistoryObject = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100`, {
    headers: { 'Authorization': `bearer ${token}` }
  })

  // store the user history in state
  const RetrievedUserHistory = userHistoryObject.data.data.children
  this.props.storeUserHistory(RetrievedUserHistory)
}

  render() {
    return <ListSaved />
  }

}

const mapStateToProps = state => {
  return { userHistory: state.userHistory }
}

export default connect(mapStateToProps, {storeUserHistory})(RedditUserData);
