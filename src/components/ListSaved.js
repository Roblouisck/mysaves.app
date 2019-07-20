import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { 
  storeToken, 
  runAutoPagination, 
  storeUserHistory, 
  appendUserHistory, 
  storeInitialData 
} from '../actions/index.js'


class ListSaved extends React.Component {
  componentDidMount (props) {
    const params = new URLSearchParams(this.props.location.hash);
    const token = params.get('#access_token')
    this.props.storeToken(token)
    this.props.storeInitialData(token)
  }

  componentDidUpdate () {
    if (this.props.startAutoPagination === true && this.props.username !== null) {
      this.autoPagination()
      this.props.runAutoPagination(false)
    }
  }

  // I keep track of the number of user saves on a page with userSaves. 
  // I get the next page of saves, dispatch an action to store that page, which is fed back to the while loop; and append that next page to an array holding all saves.
  async autoPagination () {
    while (this.props.userSaves.length > 0) {
      const lastPage = this.props.userSaves[this.props.userSaves.length-1].data.name
      const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${this.props.username}/saved/.json?limit=100&after=${lastPage}`, {
      headers: { 'Authorization': `bearer ${this.props.token}` }
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
    totalSaves: state.totalUserHistory,
    startAutoPagination: state.runAutoPagination,
    token: state.token
   }
}

export default connect(mapStateToProps, { 
  storeToken, 
  runAutoPagination, 
  storeUserHistory, 
  appendUserHistory, 
  storeInitialData })(ListSaved);