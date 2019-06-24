import React from 'react';
import RedditHistory from '../api/get_reddit_history'

const DisplaySaved = (props) => {
  const response = RedditHistory.get
  console.log(props.response.data)
  return <div>hi</div>
}

export default DisplaySaved;