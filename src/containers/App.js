import React from 'react';
import Pagination from './Pagination/Pagination';
import { Route, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import Render from '../components/Render/Render';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/authorize_callback" exact component={SignIn} />
        <Route path="/" exact component={Pagination} />
        <Route path="/" exact component={Render} />
      </BrowserRouter>
    </div>
  );
};

export default App;
