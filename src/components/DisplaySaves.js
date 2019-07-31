import React from 'react';
import { connect } from 'react-redux';
import SortSaves from '../containers/SortSaves'

class DisplaySaves extends React.Component {

  handleSearch = (arrayType) => {
    const thread = 't3'
    const comment = 't1'
    const { userSearch } = this.props

      return arrayType.map((saved, i) => {
        const searchIncludesTitle = saved.title.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesComment = saved.body.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesSubreddit = saved.subreddit.toLowerCase().includes(userSearch.toLowerCase())

        if ( searchIncludesTitle || searchIncludesComment || searchIncludesSubreddit ) {

          if (saved.type === thread) {
            return (
              <div key={saved.key}>
                <div className="index"> {i+1}. </div>
                <div className="subreddit_p"> {saved.subreddit}: </div>
                <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
              </div>
            )
          }

          if (saved.type === comment) {
            return (
              <div key={saved.key}>
                <div className="index"> {i+1}. </div>
                <div className="subreddit_c"> {saved.subreddit}: </div>
                <p className="comment"> "{saved.body}" </p>
                <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
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
    const threadsArray = threadsAndCommentsArray.filter(saved => saved.type === thread)
    const commentsArray = threadsAndCommentsArray.filter(saved => saved.type === comment)

    // 1. Check if the threads button was pushed
    if (this.props.onlyThreads === true) {

      // then, if a custom search is detected, handle it
      if (searchDetected && userSearch !== "placehold3r") {
        return this.handleSearch(threadsArray)
      }

      // Else show all threads unfiltered
      return threadsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> {saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
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
      return commentsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> {saved.subreddit}: </div>
            <p className="comment"> "{saved.body}" </p>
            <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
          </div>
          )
        })
      }


    // 3. Check for custom search if no button was pressed
      if (searchDetected && userSearch !== "placehold3r") {
      return this.handleSearch(threadsAndCommentsArray)
    }


    // 4. Else show all thread & comment saves unfiltered
    return threadsAndCommentsArray.map((saved, i) => {
      if (saved.type === thread) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> {saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
          </div>
        )
      }
      if (saved.type === comment) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> {saved.subreddit}: </div>
            <p className="comment"> "{saved.body}" </p>
            <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
          </div>
        )
      }
    })
  }

  render () {
    // SortSaves is running a componentDidUpdate, so needs to continue updating threadsAndCommentsArray after initial fetching.
    if (this.props.threadsAndCommentsArray.length < 1) {
      return (
        <div>
          <div>Fetching your reddit saves...</div>
          <SortSaves />
        </div>
      )
    }
    return (
      <div>
        <SortSaves />
        {this.renderSaves()}
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