import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { 
  fetchInitialUserData,
  storeUserToken, 
  updateCurrentPageSaves, 
  storeUserSaves,
  setPagination
} from '../actions/index.js'

class Pagination extends React.Component {
  componentDidUpdate () {
    if (this.props.runAutoPagination === true && this.props.username !== null) {
      this.runAutoPagination()
      this.props.setPagination(false)
    }
  }

  // fetchInitialUserData in SignIn.js sets initial condition to true
  async runAutoPagination () {
    while (this.props.currentPageSaves.length > 0) {
      const currentPage = this.props.currentPageSaves[this.props.currentPageSaves.length-1].data.name
      const nextPage = await axios.get (`https://oauth.reddit.com/user/${this.props.username}/saved/.json?limit=100&after=${currentPage}`, {
      headers: { 'Authorization': `bearer ${this.props.token}` }
    })

      const withNextPage = nextPage.data.data.children
      this.props.updateCurrentPageSaves(withNextPage)
      this.props.storeUserSaves(withNextPage)
    }
  }

  render () {
    return null
  }
}

const mapStateToProps = state => {
  return { 
    username: state.userData.username,
    currentPageSaves: state.userData.currentPageOfSaves,
    runAutoPagination: state.pagination.runAutoPagination,
    token: state.userData.token
   }
}

export default connect(mapStateToProps, { 
  fetchInitialUserData,
  storeUserToken, 
  updateCurrentPageSaves, 
  storeUserSaves,
  setPagination })(Pagination);