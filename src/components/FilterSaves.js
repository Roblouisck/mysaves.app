import React from 'react';
import { connect } from 'react-redux';

class FilterSaves extends React.Component {
  savesGridContainer = React.createRef();

  filterSaves = () => {
    const thread = 't3'
    const comment = 't1'
    const { userSearch } = this.props
    const { allSaves } = this.props
    const { search } = this.props
    const { allSavesChronologically } = this.props
    const searchDetected = (userSearch.trim().length > 0) 
    const threadsArray = allSaves.filter(save => save.type === thread)
    const commentsArray = allSaves.filter(save => save.type === comment)

    // 1. Check if the threads button was pushed
    if (this.props.onlyThreads === true) {

      // then, if a custom search is detected, handle it
      if (searchDetected && userSearch !== "placehold3r") {
        return search(threadsArray)
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
        return search(commentsArray)
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

    // 3. For AllSaves, check if a custom search is detected.
      if (searchDetected && userSearch !== "placehold3r") {
      return search(allSavesChronologically)
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

  displaySaves = () => {
    return this.filterSaves();
  }

  render () {
    const savesHaveLoaded = this.filterSaves() !== []
    const searchHasNoMatches = this.filterSaves().every( save => save === null )

    if (savesHaveLoaded && searchHasNoMatches) {
      return <div className="no-results">No results, try again.</div>
    }
    return this.displaySaves()
  }
}

const mapStateToProps = state => {
  return { 
    onlyThreads: state.buttons.displayOnlyThreads,
    onlyComments: state.buttons.displayOnlyComments,
    userSearch: state.userData.userSearch,
    allSaves: state.userData.saveValuesAlphabetical,
    allSavesChronologically: state.userData.saveValuesChronologically
   }
}

export default connect(mapStateToProps)(FilterSaves);