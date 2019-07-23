import { CLIENT_ID } from '../keys';

const AuthorizeReddit = () => {
  window.onload = () => {
      window.location.replace(`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=token&state=123abc&redirect_uri=http://localhost:3000/authorize_callback&duration=temporary&scope=history identity`);
  }
}

export default AuthorizeReddit;