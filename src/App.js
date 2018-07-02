import React, { Component } from 'react';

import Auth from './components/Auth';
import ToDo from './components/ToDo';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.authStateChanged = this.authStateChanged.bind(this);
  }

  authStateChanged(user) {
    if (user) {
      this.setState({ user });
      if (this.todo) {
        this.todo.handleSignIn(user.uid);
      }
    } else {
      this.setState({ user: null });
      if (this.todo) {
        this.todo.handleSignOut();
      }
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Hello{this.state.user ? `, ${this.state.user.displayName}` : ''}</h1>
        { this.state.user
          ? <ToDo ref={(instance) => { this.todo = instance; }} />
          : <Auth authStateChanged={this.authStateChanged} />
        }
      </div>
    );
  }
}

export default App;
