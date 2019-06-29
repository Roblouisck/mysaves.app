import axios from 'axios';

export default axios.create({
  baseURL: 'https://oauth.reddit.com'
});