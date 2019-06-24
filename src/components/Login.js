import React from 'react';
import { CLIENT_ID } from '../keys';

const Login = () => {
  return (
    <div>
    <a href={`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=token&state=123abc&redirect_uri=http://localhost:3000/authorize_callback&duration=temporary&scope=history identity`}>Sign In</a>
    </div>
  )
}

export default Login;