import React from 'react';
import { connect } from 'react-redux';

class DisplaySaves extends React.Component {
  renderPostTitles = () => {
    return this.props.totalUserSaves.map((saved) => {
      return (
        <div key={saved.data.id}>
          <div>{saved.data.title}</div>
        </div>
      )
    })
  }

  render () {
    return <div>{this.renderPostTitles()}</div>
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    totalUserSaves: state.userData.totalUserData,
   }
}

export default connect(mapStateToProps)(DisplaySaves);