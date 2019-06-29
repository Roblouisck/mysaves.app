import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { storeUserHistory, appendUserHistory, storeInitialData } from '../actions/index.js'


class ListSaved extends React.Component {
  componentDidMount (props) {
    const params = new URLSearchParams(this.props.location.hash);
    const token = params.get('#access_token')

    this.props.storeInitialData(token)

    setTimeout(() => {
      this.autoPagination(token);
    }, 3000)
  }

  autoPagination = async (token, response) => {
    while (this.props.userSaves.length > 0) {
      let { userSaves } = this.props
      let lastPage = userSaves[userSaves.length-1].data.name
      
      let response = await axios.get (`https://oauth.reddit.com/user/BetterRedditSaves/saved/.json?limit=100&after=${lastPage}`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
      this.props.storeUserHistory(response.data.data.children)
      this.props.appendUserHistory(response.data.data.children)
    }
  }

  renderPostTitles = () => {
    return this.props.totalSaves.map((saved) => {
      return (
        <div key={saved.data.id}>
          <div>{saved.data.title}</div>
        </div>
      )
    })
  }

  render () {
    return <div>{this.renderPostTitles()}</div>
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    userSaves: state.userHistory,
    totalSaves: state.totalUserHistory
   }
}

export default connect(mapStateToProps, { storeUserHistory, appendUserHistory, storeInitialData })(ListSaved);

