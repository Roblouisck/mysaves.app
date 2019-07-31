import React from 'react';
import { storeSearchQuery } from '../actions/index'
import { connect } from 'react-redux'

class DisplaySearch extends React.Component {
  render() {

      if (this.props.username === null) {
        return null
      }

      return (
          <form>
            <input 
              className="searchBox"
              type="search"
              placeholder="Search saves"
              onChange={ (e) => this.props.storeSearchQuery(e.target.value) }
              />
          </form>
      );
    }
  }

const mapStateToProps = state => {
  return {
    username: state.userData.username,
  }
}

export default connect(mapStateToProps, { storeSearchQuery })(DisplaySearch);