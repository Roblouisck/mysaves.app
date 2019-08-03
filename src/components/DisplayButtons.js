import React from 'react';
import { connect } from 'react-redux';
import { 
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
} from '../actions/index.js'

class DisplayButtons extends React.Component {
  myFunction = event => {
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


  render () {
    return (
      <div className="grid-header-container">
        <div className="grid-header">
          <div className="btn-group">
            <button onClick={this.myFunction} id="All Saves">All Saves</button>
            <button onClick={this.myFunction} id="Threads">Threads</button>
            <button onClick={this.myFunction} id="Comments">Comments</button>
          </div>
        </div>
      </div>
      ) 
  }
}

const mapStateToProps = state => {
  return { 
    username: state.userData.username
   }
}

export default connect (mapStateToProps, {
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
})(DisplayButtons);