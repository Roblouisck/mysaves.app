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
    if (this.props.username === null) {
      return null
    }
    return (
      <div className="container">
        <div className="btn-group">
          <button onClick={this.myFunction} id="All Saves">All Saves</button>
          <button onClick={this.myFunction} id="Threads">Threads</button>
          <button onClick={this.myFunction} id="Comments">Comments</button>
        </div>
      </div>
      ) 
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    username: state.userData.username
   }
}

export default connect (mapStateToProps, {
  displayThreadsAndComments,
  displayOnlyThreads, 
  displayOnlyComments
})(DisplayButtons);