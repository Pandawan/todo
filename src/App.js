import React, { Component } from 'react';

import Auth from './components/Auth';
import ToDo from './components/ToDo';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.authStateChanged = this.authStateChanged.bind(this);
  }

  authStateChanged(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <Auth authStateChanged={this.authStateChanged} />
        { this.state.user
          ? <ToDo />
          : ''
        }
      </div>
    );
  }
}

export default App;
