import React from 'react';
import AuthorizeReddit from './AuthorizeReddit'
import { BrowserRouter, Route } from 'react-router-dom';
// import RedditUserData from '../api/get_reddit_history';
import ListSaved from './ListSaved'

const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Route path="/" exact component={AuthorizeReddit} />
        <Route path="/authorize_callback" exact component={ListSaved} /> 
      </BrowserRouter>
    </div>
  )
}

export default App;