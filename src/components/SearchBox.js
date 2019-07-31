import React from 'react';
import { storeSearchQuery } from '../actions/index'
import { connect } from 'react-redux'

class SearchBox extends React.Component {
  render() {
      return (
        <div>
          <form>
            <input 
              className="searchBox"
              type="search"
              placeholder="Search saves"
              onChange={ (e) => this.props.storeSearchQuery(e.target.value) }
              />
          </form>
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { storeSearchQuery })(SearchBox);