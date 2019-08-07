import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { 
  fetchInitialUserData,
  storeUserToken, 
  storeUserSavesTemporarily, 
  appendUserSaves,
  setPagination
} from '../actions/index.js'
import DisplaySaves from '../components/DisplaySaves'

class Pagination extends React.Component {
  componentDidUpdate () {
    if (this.props.runAutoPagination === true && this.props.username !== null) {
      this.runAutoPagination()
      this.props.setPagination(false)
    }
  }

  // I keep track of the number of user saves on a page with userSaves. I get the next page of saves, dispatch an action to store that page, which is fed back to the while loop; and append that next page to an array holding all saves.
  async runAutoPagination () {
    while (this.props.userSaves.length > 0) {
      const lastPage = this.props.userSaves[this.props.userSaves.length-1].data.name
      const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${this.props.username}/saved/.json?limit=100&after=${lastPage}`, {
      headers: { 'Authorization': `bearer ${this.props.token}` }
    })
      const currentPageSaves = userSavesObject.data.data.children
      this.props.storeUserSavesTemporarily(currentPageSaves)
      this.props.appendUserSaves(currentPageSaves)
    }
  }

  render () {
    return null
  }
}

const mapStateToProps = state => {
  return { 
    username: state.userData.username,
    userSaves: state.userData.temporaryUserSaves,
    runAutoPagination: state.pagination.runAutoPagination,
    token: state.userData.token
   }
}

export default connect(mapStateToProps, { 
  fetchInitialUserData,
  storeUserToken, 
  storeUserSavesTemporarily, 
  appendUserSaves,
  setPagination })(Pagination);