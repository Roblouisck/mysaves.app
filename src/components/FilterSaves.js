import React from 'react';
import { connect } from 'react-redux';

class FilterSaves extends React.Component {
  savesGridContainer = React.createRef();

  filterSaves = () => {
    const thread = 't3'
    const comment = 't1'
    const { userSearch } = this.props
    const { allSavesAlphabetical } = this.props
    const { search } = this.props
    const { allSavesChronological } = this.props
    const searchDetected = (userSearch.trim().length > 0) 
    const threadsArray = allSavesAlphabetical.filter(save => save.type === thread)
    const commentsArray = allSavesAlphabetical.filter(save => save.type === comment)

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
      return search(allSavesChronological)
    }

    // 4. Else show all thread & comment saves unfiltered
    return allSavesChronological.map((save, i) => {
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
    const searchHasNoMatches = this.filterSaves().every( save => save === null )
    
    if (this.props.allSavesChronological.length === 0) {
      return <div className='fetching-text'>Fetching your saves...</div>
    } 

    if (this.props.userSearch !== 'placehold3r' && searchHasNoMatches) {
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
    allSavesAlphabetical: state.userData.savesAlphabetically,
    allSavesChronological: state.userData.savesChronologically
   }
}

export default connect(mapStateToProps)(FilterSaves);