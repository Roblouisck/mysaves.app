import React from 'react';
import AuthorizeReddit from './AuthorizeReddit'
import { BrowserRouter, Route } from 'react-router-dom';
import RedditUserData from '../api/get_reddit_history';
// import DisplaySaved from './DisplaySaved';

const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Route path="/" exact component={AuthorizeReddit} />
        <Route path="/authorize_callback" exact component={RedditUserData} /> 
        {/* <Route path="/authorize_callback" exact component={DisplaySaved} /> */}
      </BrowserRouter>
    </div>
  )
}

export default App;

// get data from reddit.com/user/me.json -->