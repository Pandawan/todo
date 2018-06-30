import React, { Component } from 'react';
import List from './components/List';
import Form from './components/Form';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(newText) {
    this.setState({ text: newText });
  }

  handleSubmit() {
    if (this.state.text.length) {
      const newItem = {
        text: this.state.text,
        id: Date.now(),
      };
      this.setState(prevState => ({ items: [...prevState.items, newItem], text: '' }));
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <List items={this.state.items} />
        <Form
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
