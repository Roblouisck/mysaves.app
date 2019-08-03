import React from 'react';
import { storeSearchQuery } from '../actions/index'
import { connect } from 'react-redux'

class DisplaySearch extends React.Component {
  render() {
      return (
        <div className="grid-header-container">
          <div className="grid-header">
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

export default connect(mapStateToProps, { storeSearchQuery })(DisplaySearch);