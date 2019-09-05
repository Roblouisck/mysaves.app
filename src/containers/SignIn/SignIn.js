import React from 'react';
import { connect } from 'react-redux';
import { fetchInitialUserData, storeUserToken } from '../../actions/index.js';

class SignIn extends React.Component {
  componentDidMount(props) {
    const params = new URLSearchParams(this.props.location.hash);
    const token = params.get('#access_token');
    this.props.storeUserToken(token);
    this.props.fetchInitialUserData(token);
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchInitialUserData,
    storeUserToken,
  }
)(SignIn);
