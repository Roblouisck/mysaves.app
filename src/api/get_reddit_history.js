import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { storeUserHistory, appendUserHistory, storeInitialData } from '../actions/index.js'
import ListSaved from '../components/ListSaved'

class RedditUserData extends React.Component {

  // Retrieving our reddit api access token from the current url
  async componentDidMount (props) {

  // auto pagination: store second page of user history & onward in state
  while (this.props.userHistory.length > 0) {
    let { userHistory } = this.props
    let lastPage = userHistory[userHistory.length-1].data.name

    const response = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100&after=${lastPage}`, {
    headers: { 'Authorization': `bearer ${token}` }
  })
    const RetrievedUserHistory = response.data.data.children
    this.props.storeUserHistory(RetrievedUserHistory)
    this.props.appendUserHistory(RetrievedUserHistory)
  }
}

  render() {
    return <ListSaved />
  }

}

const mapStateToProps = state => {
  return { userHistory: state.userHistory }
}

export default connect(mapStateToProps, {storeUserHistory, appendUserHistory, storeInitialData})(RedditUserData);
