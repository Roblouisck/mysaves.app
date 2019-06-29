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

  autoPagination = async token => {
    while (this.props.userSaves.length > 0) {
      const { userSaves } = this.props
      const lastPage = userSaves[userSaves.length-1].data.name

      const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${this.props.username}/saved/.json?limit=100&after=${lastPage}`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
      const currentPageSaves = userSavesObject.data.data.children
      this.props.storeUserHistory(currentPageSaves)
      this.props.appendUserHistory(currentPageSaves)
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
    username: state.username,
    userSaves: state.userHistory,
    totalSaves: state.totalUserHistory
   }
}

export default connect(mapStateToProps, { storeUserHistory, appendUserHistory, storeInitialData })(ListSaved);

