import React from 'react';
import { storeSearchQuery } from '../actions/index'
import { connect } from 'react-redux'
import { 
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
} from '../actions/index.js'

class RenderHeader extends React.Component {
  handleButtons = event => {
    const buttonID = event.target.id;
    switch (buttonID) {

        case 'all-saves':
            this.props.displayThreadsAndComments(true);
            break;

        case 'only-threads':
            this.props.displayOnlyThreads(true);
            break;

        case 'only-comments':
            this.props.displayOnlyComments(true);
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
                onChange={ (e) => this.props.storeSearchQuery(e.target.value) }
                />
                <span class="fa fa-search"></span>
            </form>

          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {
    username: state.userData.username,
  }
}

export default connect (mapStateToProps, {
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments,
  storeSearchQuery
})(RenderHeader);