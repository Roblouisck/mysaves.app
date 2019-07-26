import React from 'react';
import { connect } from 'react-redux';

class DisplaySaves extends React.Component {

  renderPostTitles = () => {
    const importantValues = this.props.totalUserSaves.map((saved) => {
      return { 
        subreddit: saved.data.subreddit, 
        title: saved.data.title, 
        key: saved.data.id, 
        link: `https://www.reddit.com${saved.data.permalink}`,
        type: saved.kind,
        body: saved.data.body
      }
    })

    importantValues.sort((a, b) => {
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
    
    return importantValues.map((saved, i) => {
      const thread = 't3'
      const comment = 't1'

      if (saved.type === thread) {
        return (
          <div className="container" key={saved.key}>
            <div className="index"> {i}. </div>
            <div className="subreddit"> r/{saved.subreddit}: </div>
            <div className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </div>
          </div>
        )
      }
      if (saved.type === comment) {
        return (
          <div className="container" key={saved.key}>
            <div className="index"> {i}. </div>
            <div className="subreddit"> r/{saved.subreddit}: </div>
            <div className="comment"> "{saved.body}" </div>
            <div className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </div>
          </div>
        )
      }
    })
  };

  render () {
    if (this.props.username === null) {
      return <div>Fetching your reddit saves...</div>
    }
    return <div>{this.renderPostTitles()}</div>
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    totalUserSaves: state.userData.totalUserSaves,
    username: state.userData.username
   }
}

export default connect(mapStateToProps)(DisplaySaves);