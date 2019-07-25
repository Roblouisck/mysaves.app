import React from 'react';
import { connect } from 'react-redux';

class DisplaySaves extends React.Component {

  renderPostTitles = () => {
    return this.props.totalUserSaves.map((saved) => {
      const reddit_thread = 't3'
      const post_title = saved.data.title
      const subreddit = saved.data.subreddit
      const post_url = `https://www.reddit.com${saved.data.permalink}`

      if ( saved.kind === reddit_thread ) {
        return (
          <div key={saved.data.id}>
            <div className="post"> {subreddit} </div>
            <div className="post"> <a href={post_url}> {post_title} </a> </div>
          </div>
        )}
      return null
    })
  }

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