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

    const thread = 't3'
    const comment = 't1'
    const threadsArray = importantValues.filter(saved => saved.type === thread)
    const commentsArray = importantValues.filter(saved => saved.type === comment)

    // Handle threads
    if (this.props.onlyThreads === true) {
      return threadsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> r/{saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
          </div>
        )
      })
    }


    // Handle comments
    if (this.props.onlyComments === true) {
      return commentsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> r/{saved.subreddit}: </div>
            <p className="comment"> "{saved.body}" </p>
            <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
          </div>
          )
        })
      }

    // Else handle both
    return importantValues.map((saved, i) => {
      if (saved.type === thread) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> r/{saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
          </div>
        )
      }
      if (saved.type === comment) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> r/{saved.subreddit}: </div>
            <p className="comment"> "{saved.body}" </p>
            <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
          </div>
        )
      }
    })
  }

  render () {
    if (this.props.username === null) {
      return <div>Fetching your reddit saves...</div>
    }
    return (
        <div>{this.renderPostTitles()}</div>
      ) 
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    totalUserSaves: state.userData.totalUserSaves,
    username: state.userData.username,
    onlyThreads: state.buttons.displayOnlyThreads,
    onlyComments: state.buttons.displayOnlyComments
   }
}

export default connect(mapStateToProps)(DisplaySaves);