import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { 
  storeInitialData,
  storeUserToken, 
  storeUserSaves, 
  appendUserSaves,
  setPagination
} from '../actions/index.js'


class ListSaved extends React.Component {
  componentDidMount (props) {
    const params = new URLSearchParams(this.props.location.hash);
    const token = params.get('#access_token')
    this.props.storeUserToken(token)
    this.props.storeInitialData(token)
  }

  componentDidUpdate () {
    if (this.props.runAutoPagination === true && this.props.username !== null) {
      this.runAutoPagination()
      this.props.setPagination(false)
    }
  }

  // I keep track of the number of user saves on a page with userSaves. 
  // I get the next page of saves, dispatch an action to store that page, which is fed back to the while loop; and append that next page to an array holding all saves.
  async runAutoPagination () {
    while (this.props.userSaves.length > 0) {
      const lastPage = this.props.userSaves[this.props.userSaves.length-1].data.name
      const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${this.props.username}/saved/.json?limit=100&after=${lastPage}`, {
      headers: { 'Authorization': `bearer ${this.props.token}` }
    })
      const currentPageSaves = userSavesObject.data.data.children
      this.props.storeUserSaves(currentPageSaves)
      this.props.appendUserSaves(currentPageSaves)
    }
  }

  renderPostTitles = () => {
    return this.props.totalUserSaves.map((saved) => {
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
    username: state.userData.username,
    userSaves: state.userData.userData,
    totalUserSaves: state.userData.totalUserData,
    runAutoPagination: state.pagination.runAutoPagination,
    token: state.userData.token
   }
}

export default connect(mapStateToProps, { 
  storeInitialData,
  storeUserToken, 
  storeUserSaves, 
  appendUserSaves,
  setPagination })(ListSaved);