import React from 'react';
import { connect } from 'react-redux';

class DisplaySaves extends React.Component {

  renderPostTitles = () => {
    const importantValues = this.props.totalUserSaves.map((saved) => {
      return { 
        subreddit: String(`r/${saved.data.subreddit}`), 
        title: String(saved.data.title), 
        key: saved.data.id, 
        link: String(`https://www.reddit.com${saved.data.permalink}`),
        type: String(saved.kind),
        body: String(saved.data.body)
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


    const { userSearch } = this.props
    const thread = 't3'
    const comment = 't1'
    const threadsArray = importantValues.filter(saved => saved.type === thread)
    const commentsArray = importantValues.filter(saved => saved.type === comment)



    // Show only threads
    if (this.props.onlyThreads === true) {
      return threadsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> {saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
          </div>
        )
      })
    }

    // Show only comments
    if (this.props.onlyComments === true) {
      return commentsArray.map((saved, i) => {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> {saved.subreddit}: </div>
            <p className="comment"> "{saved.body}" </p>
            <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
          </div>
          )
        })
      }

    // Show custom search
    if (userSearch !== "placehold3r" && userSearch.trim().length > 0) {
      return importantValues.map((saved, i) => {

        const searchIncludesTitle = saved.title.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesComment = saved.body.toLowerCase().includes(userSearch.toLowerCase())
        const searchIncludesSubreddit = saved.subreddit.toLowerCase().includes(userSearch.toLowerCase())

        if ( searchIncludesTitle || searchIncludesComment || searchIncludesSubreddit ) {
          if (saved.type === thread) {
            return (
              <div key={saved.key}>
                <div className="index"> {i+1}. </div>
                <div className="subreddit_p"> {saved.subreddit}: </div>
                <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
              </div>
            )
          }

          if (saved.type === comment) {
            return (
              <div key={saved.key}>
                <div className="index"> {i+1}. </div>
                <div className="subreddit_c"> {saved.subreddit}: </div>
                <p className="comment"> "{saved.body}" </p>
                <p className="comment"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> src </a> </p>
              </div>
            )
          }
        }
      }
    )}

    // Else show all by default
    return importantValues.map((saved, i) => {
      if (saved.type === thread) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_p"> {saved.subreddit}: </div>
            <p className="post"> <a href={saved.link} target="_blank" rel="noopener noreferrer"> {saved.title} </a> </p>
          </div>
        )
      }
      if (saved.type === comment) {
        return (
          <div key={saved.key}>
            <div className="index"> {i+1}. </div>
            <div className="subreddit_c"> {saved.subreddit}: </div>
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
      <div>
        <div>{this.renderPostTitles()}</div>
      </div>
      ) 
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    totalUserSaves: state.userData.totalUserSaves,
    username: state.userData.username,
    onlyThreads: state.buttons.displayOnlyThreads,
    onlyComments: state.buttons.displayOnlyComments,
    userSearch: state.userData.userSearch
   }
}

export default connect(mapStateToProps)(DisplaySaves);