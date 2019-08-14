import React from 'react';
import { storeUserSearch } from '../actions/index'
import { connect } from 'react-redux'
import { 
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
} from '../actions/index.js'

class Header extends React.Component {
  handleButtons = event => {

    const { savesGridCont } = this.props
    const savesGridContainer = savesGridCont.current.classList

      const buttonID = event.target.id;
      switch (buttonID) {

          case 'all-saves':
              this.props.displayThreadsAndComments(true);
              savesGridContainer.remove('growSavesGridContainer');
              break;

          case 'only-threads':
              this.props.displayOnlyThreads(true);
              savesGridContainer.add('growSavesGridContainer');
              break;

          case 'only-comments':
              this.props.displayOnlyComments(true);
              savesGridContainer.remove('growSavesGridContainer');
              break;

          default:
              return false;
        }
      }

  render() {
      return (
        <div className="grid-header-container">
          <div className="grid-header">

            <div className="btn-group">
              <button onClick={this.handleButtons} id="all-saves">All Saves</button>
              <button onClick={this.handleButtons} id="only-threads">Threads</button>
              <button onClick={this.handleButtons} id="only-comments">Comments</button>
            </div>

            <form>
              <input 
                className="searchBox fas fa-search"
                type="search"
                placeholder="Search or filter by subreddit"
                onChange={event => this.props.storeUserSearch(event.target.value) }
                />
                <span className="fa fa-search"></span>
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