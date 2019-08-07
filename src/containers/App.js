import React from 'react';
import Pagination from './Pagination';
import { Route, BrowserRouter } from 'react-router-dom';
import DisplaySaves from '../components/DisplaySaves';
import SignIn from '../containers/SignIn';

const App = () => {
  return ( 
    <div>
      <BrowserRouter>
        <Route path="/authorize_callback" exact component={SignIn} /> 
        <Route path="/" exact component={Pagination} /> 
        <Route path="/" exact component={DisplaySaves} /> 
      </BrowserRouter>
    </div>
  )
}

export default App;