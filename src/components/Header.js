import React from 'react';
import { storeUserSearch } from '../actions/index'
import { connect } from 'react-redux'
import { 
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
} from '../actions/index.js'

class Header extends React.Component {
  cancelSearch = React.createRef();

  handleButtons = event => {

    const { savesGridCont } = this.props
    const savesGridContainer = savesGridCont.current.classList

      const buttonID = event.target.id;
      switch (buttonID) {

          case 'btn-all-saves':
              this.props.displayThreadsAndComments(true);
              savesGridContainer.remove('growSavesGridContainer');
              break;

          case 'btn-only-threads':
              this.props.displayOnlyThreads(true);
              savesGridContainer.add('growSavesGridContainer');
              break;

          case 'btn-only-comments':
              this.props.displayOnlyComments(true);
              savesGridContainer.remove('growSavesGridContainer');
              break;

          default:
              return false;
        }
      }

  handleIconClick = event => {
    event.target.parentElement.firstChild.value='';
    this.props.storeUserSearch('');
    this.toggleCancelSearchIcon(event.target.parentElement.firstChild.value);
  }
  
  handleOnChange = event => {
    this.props.storeUserSearch(event.target.value);
    this.toggleCancelSearchIcon(event.target.parentElement.firstChild.value);
  }

  toggleCancelSearchIcon = (userSearch) => {
    const cancelSearch = this.cancelSearch.current.classList

    if (userSearch === '' ) {
      cancelSearch.add('hide')
      cancelSearch.remove('show')
    }

    if (userSearch !== 'placehold3r' && userSearch !== '') {
      cancelSearch.add('show')
      cancelSearch.remove('hide')
    }
  }

  render() {
      return (
        <div className="grid-header-container">
          <div className="grid-header">

            <div className="btn-group">
              <button onClick={this.handleButtons} id="btn-all-saves">All Saves</button>
              <button onClick={this.handleButtons} id="btn-only-threads">Threads</button>
              <button onClick={this.handleButtons} id="btn-only-comments">Comments</button>
            </div>

            <form>
              <input 
                className="searchBox fas fa-search"
                type="search"
                placeholder="Search or filter by subreddit"
                onChange={this.handleOnChange} />
              <i className="cancelSearch fas fa-times" onClick={this.handleIconClick} ref={this.cancelSearch}> </i>
              <span className="fa fa-search"> </span>
            </form>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect (mapStateToProps, {
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments,
  storeUserSearch
})(Header);