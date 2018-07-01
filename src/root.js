import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Routes from './routes';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Routes />
      </Provider>
    );
  }
}
