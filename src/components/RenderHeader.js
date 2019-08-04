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

        case 'All Saves':
            this.props.displayThreadsAndComments(true);
            break;

        case 'Threads':
            this.props.displayOnlyThreads(true);
            break;

        case 'Comments':
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
              <button onClick={this.handleButtons} id="All Saves">All Saves</button>
              <button onClick={this.handleButtons} id="Threads">Threads</button>
              <button onClick={this.handleButtons} id="Comments">Comments</button>
            </div>

            <form>
              <input 
                className="searchBox"
                type="search"
                placeholder="Search saves"
                onChange={ (e) => this.props.storeSearchQuery(e.target.value) }
                />
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