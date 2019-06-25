import React from 'react';
import { connect } from 'react-redux';

class ListSaved extends React.Component {

  renderPostTitles() {
    return this.props.userSaves.map((saved) => {
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
  return { userSaves: state.userHistory }
}

export default connect(mapStateToProps)(ListSaved);