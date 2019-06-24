import axios from 'axios';
import React from 'react';

class RedditUserData extends React.Component {
  state = {savedPosts: [] }

  // Retrieving our reddit api access token from the current url
  async componentDidMount (props) {
  const params = new URLSearchParams(this.props.location.hash);
  const token = params.get('#access_token')

  const userIdentityData = await axios.get ('https://oauth.reddit.com/api/v1/me', {
    headers: { 'Authorization': `bearer ${token}` }
  })
    const userHistoryData = await axios.get (`https://oauth.reddit.com/user/${userIdentityData.data.name}/saved`, {
    headers: { 'Authorization': `bearer ${token}` }
  })
  this.setState({savedPosts: userHistoryData.data.data.children})
  console.log(this.state.savedPosts)
}

  render() {
    return <div>loading</div>
  }
}

export default RedditUserData;
