import React, { Component } from 'react';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, text: '' };
  }

  render() {
    return (
      <div className="todo">
        <p>{this.state.tasks ? JSON.stringify(this.state.tasks) : ''}</p>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default ToDo;
