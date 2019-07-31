import React from 'react';
import { connect } from 'react-redux';
import { storeImportantSaveValues } from '../actions/index'

class SortSaves extends React.Component {
  componentDidUpdate() {
    const importantValuesUnsorted = this.props.totalUserSaves.map((saved) => {
      return { 
        subreddit: String(`r/${saved.data.subreddit}`), 
        title: String(saved.data.title), 
        key: saved.data.id, 
        link: String(`https://www.reddit.com${saved.data.permalink}`),
        type: String(saved.kind),
        body: String(saved.data.body)
      }
    })

    const importantValues = importantValuesUnsorted.sort((a, b) => {
      let nameA = a.subreddit.toUpperCase();
      let nameB = b.subreddit.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
        return 0;
      });

    this.props.storeImportantSaveValues(importantValues)
  }


  render () {
    return null
  }
}

const mapStateToProps = state => {
  return { 
    totalUserSaves: state.userData.totalUserSaves
   }
}

export default connect(mapStateToProps, { storeImportantSaveValues })(SortSaves);