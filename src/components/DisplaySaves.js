import React from 'react';
import { connect } from 'react-redux';
import OrganizeSaves from '../containers/OrganizeSaves'
import LoadingScreen from './LoadingScreen'
import RenderHeader from './RenderHeader'

class DisplaySaves extends React.Component {
  savesGridContainer = React.createRef();

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
    const { threadsAndCommentsArray } = this.props
    const searchDetected = (userSearch.trim().length > 0) 
    const threadsArray = threadsAndCommentsArray.filter(save => save.type === thread)
    const commentsArray = threadsAndCommentsArray.filter(save => save.type === comment)

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
      return this.handleSearch(threadsAndCommentsArray)
    }


    // 4. Else show all thread & comment saves unfiltered
    return threadsAndCommentsArray.map((save, i) => {
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
    // OrganizeSaves is running a componentDidUpdate, so needs to continue updating threadsAndCommentsArray after initial fetching.
    if (this.props.threadsAndCommentsArray.length < 1) {
      return (
        <div>
          <p>Fetching your reddit saves...</p>
          <OrganizeSaves />
        </div>
      )
    }
    return (
      <div>
        <OrganizeSaves />
        <RenderHeader savesGridContainer={this.savesGridContainer}/>
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
    totalUserSaves: state.userData.totalUserSaves,
    username: state.userData.username,
    onlyThreads: state.buttons.displayOnlyThreads,
    onlyComments: state.buttons.displayOnlyComments,
    userSearch: state.userData.userSearch,
    threadsAndCommentsArray: state.userData.importantSaveValues
   }
}

export default connect(mapStateToProps)(DisplaySaves);