import React from 'react';
import { connect } from 'react-redux';
import OrganizeSaves from '../containers/OrganizeSaves'
import LoadingScreen from './LoadingScreen'
import RenderHeader from './RenderHeader'

class DisplaySaves extends React.Component {
  componentDidMount = () => {
    if (this.props.token === null) {
      window.location.replace(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&state=123abc&redirect_uri=${process.env.REACT_APP_URI}&duration=temporary&scope=history identity`);
    }
    return null
  }

  savesGridContainer = React.createRef();
  ss = React.createRef();

  handleSearch = (arrayType) => {
    const thread = 't3'
    const comment = 't1'
    const { userSearch } = this.props

      return arrayType.map((save, i) => {
        const searchIncludesTitle = save.title.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesComment = save.body.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesSubreddit = save.subreddit.toLowerCase().includes(userSearch.toLowerCase())

        if ( searchIncludesTitle || searchIncludesComment || searchIncludesSubreddit ) {
          
          if (this.props.onlyThreads === true) {
            return (
              <div className="save-wrapper-threadsOnly" key={save.key}>
                <div className="index"> {i+1}. </div>
                {save.displaySubreddit_t}
                {save.displayTitle_ThreadOnly}
              </div>
            )
          }

          if (save.type === thread) {
            return (
              <div className="save-wrapper" key={save.key}>
                <div className="index"> {i+1}. </div>
                {save.displaySubreddit_t}
                {save.displayTitle}
              </div>
            )
          }

          if (save.type === comment) {
            return (
              <div className="save-wrapper" key={save.key}>
                <div className="index"> {i+1}. </div>
                {save.displaySubreddit_c}
                {save.displayComment}
              </div>
            )
          }
        }
      }
    )
  }

  renderSaves = () => {
    const thread = 't3'
    const comment = 't1'
    const { userSearch } = this.props
    const { allSaves } = this.props
    const { allSavesChronologically } = this.props
    const searchDetected = (userSearch.trim().length > 0) 
    const threadsArray = allSaves.filter(save => save.type === thread)
    const commentsArray = allSaves.filter(save => save.type === comment)

    // 1. Check if the threads button was pushed
    if (this.props.onlyThreads === true) {

      // then, if a custom search is detected, handle it
      if (searchDetected && userSearch !== "placehold3r") {
        return this.handleSearch(threadsArray)
      }

      // Else show all threads unfiltered
      return threadsArray.map((save, i) => {
        return (
          <div className="save-wrapper-threadsOnly" key={save.key}>
            <div className="index"> {i+1}. </div>
            {save.displaySubreddit_t}
            {save.displayTitle_ThreadOnly}
          </div>
        )
      })
    }

    // 2. Check if the comments button was pushed
    if (this.props.onlyComments === true) {

      // then, if a custom search is detected, handle it
      if (searchDetected && userSearch !== "placehold3r") {
        return this.handleSearch(commentsArray)
      }

      // Else show all comments unfiltered
      return commentsArray.map((save, i) => {
        return (
          <div className="save-wrapper" key={save.key}>
            <div className="index"> {i+1}. </div>
            {save.displaySubreddit_c}
            {save.displayComment}
          </div>
          )
        })
      }


    // 3. Check for custom search if no button was pressed
      if (searchDetected && userSearch !== "placehold3r") {
      return this.handleSearch(allSavesChronologically)
    }


    // 4. Else show all thread & comment saves unfiltered
    return allSavesChronologically.map((save, i) => {
      if (save.type === thread) {
        return (
          <div className="save-wrapper" key={save.key}>
            <div className="index"> {i+1}. </div>
            {save.displaySubreddit_t}
            {save.displayTitle}
          </div>
        )
      }
      if (save.type === comment) {
        return (
          <div className="save-wrapper" key={save.key}>
            <div className="index"> {i+1}. </div>
            {save.displaySubreddit_c}
            {save.displayComment}
          </div>
        )
      }
    })
  }

  render () {
    return (
      <div>
        <OrganizeSaves />
        <RenderHeader savesGridCont={this.savesGridContainer}/>
        <div className="saves-grid-container" ref={this.savesGridContainer}>
          <div className="saves-grid">
            {this.renderSaves()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    token: state.userData.token,
    totalUserSaves: state.userData.totalUserSaves,
    username: state.userData.username,
    onlyThreads: state.buttons.displayOnlyThreads,
    onlyComments: state.buttons.displayOnlyComments,
    userSearch: state.userData.userSearch,
    allSaves: state.userData.saveValuesWithHTML,
    allSavesChronologically: state.userData.saveValuesChronologically
   }
}

export default connect(mapStateToProps)(DisplaySaves);