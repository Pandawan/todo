import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, provider } from '../firebase';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      user: null,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    // If already logged in, use previous user state
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      if (this.props.authStateChanged) {
        this.props.authStateChanged(user);
      }
    });
  }

  signIn() {
    auth.signInWithRedirect(provider).then((result) => {
      const { user } = result;
      this.setState({ user, error: '' });
      localStorage.setItem('userId', user.uid);
    }).catch((error) => {
      console.error(`SignIn Error: ${error}`);
      this.setState({ user: null, error });
    });
  }

  signOut() {
    auth.signOut().then(() => {
      this.setState({ user: null, error: '' });
    }).catch((error) => {
      console.error(`SignIn Error: ${error}`);
      this.setState({ error });
    });
  }

  render() {
    return (
      <div className="auth">
        {!this.state.error ? ''
          : <p className="error">{this.state.error}</p>
        }
        {this.state.user
          ? (
            <div className="greet">
              <p>Hello, {this.state.user.displayName}</p>
              <button type="button" onClick={this.signOut}>Sign Out</button>
            </div>
          )
          : <button type="button" onClick={this.signIn}>Sign In</button>
        }
      </div>
    );
  }
}


Auth.propTypes = {
  authStateChanged: PropTypes.func,
};

Auth.defaultProps = {
  authStateChanged: () => {},
};

export default Auth;
