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
        this.todo.onSignIn(user.uid);
      }
    } else {
      this.setState({ user: null });
      if (this.todo) {
        this.todo.onSignOut();
      }
    }
  }

  render() {
    return (
      <div className="app">
        { this.state.user
          ? <ToDo ref={(instance) => { this.todo = instance; }} user={this.state.user} />
          : <Auth authStateChanged={this.authStateChanged} />
        }
      </div>
    );
  }
}

export default App;
