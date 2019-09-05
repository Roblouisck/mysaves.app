import React from 'react';
import { connect } from 'react-redux';
import FilterSaves from '../../components/FilterSaves/FilterSaves';

import './index.css';

class Search extends React.Component {
  handleSearch = arrayType => {
    const thread = 't3';
    const comment = 't1';
    const { userSearch } = this.props;

    return arrayType.map((save, i) => {
      const searchIncludesTitle = save.title
        .toLowerCase()
        .includes(userSearch.toLowerCase());
      const searchIncludesComment = save.body
        .toLowerCase()
        .includes(userSearch.toLowerCase());
      const searchIncludesSubreddit = save.subreddit
        .toLowerCase()
        .includes(userSearch.toLowerCase());

      if (
        searchIncludesTitle ||
        searchIncludesComment ||
        searchIncludesSubreddit
      ) {
        if (this.props.onlyThreads === true) {
          return (
            <div className="save-wrapper-threadsOnly" key={save.key}>
              <div className="index"> {i + 1}. </div>
              {save.displaySubreddit_t}
              {save.displayTitle_ThreadOnly}
            </div>
          );
        }

        if (save.type === thread) {
          return (
            <div className="save-wrapper" key={save.key}>
              <div className="index"> {i + 1}. </div>
              {save.displaySubreddit_t}
              {save.displayTitle}
            </div>
          );
        }

        if (save.type === comment) {
          return (
            <div className="save-wrapper" key={save.key}>
              <div className="index"> {i + 1}. </div>
              {save.displaySubreddit_c}
              {save.displayComment}
            </div>
          );
        }
      }
      return null;
    });
  };

  render() {
    return <FilterSaves search={this.handleSearch} />;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    onlyThreads: state.buttons.displayOnlyThreads,
    userSearch: state.userData.userSearch,
  };
};

export default connect(mapStateToProps)(Search);
