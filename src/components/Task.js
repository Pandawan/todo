import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: this.props.item.done,
    };
    this.handleMarkDone = this.handleMarkDone.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.done !== props.item.done) {
      this.setState({ done: this.props.item.done });
    }
  }

  handleMarkDone(e) {
    this.setState({ done: e.target.checked });
    this.props.handleMarkDone(e.target.checked);
  }

  render() {
    return (
      <li className="task-item">
        <div className="task-body">
          <input className="task-done-button" type="checkbox" value="done" checked={this.state.done} onChange={this.handleMarkDone} />
          <div className="task-content">
            <p className={this.state.done ? 'task-name task-done' : 'task-name'}>{this.props.item.name}</p>
          </div>
          <button className="task-remove-button" type="button" onClick={this.props.handleRemove}>Remove</button>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    done: PropTypes.bool,
    created: PropTypes.any,
  }).isRequired,
  handleMarkDone: PropTypes.func,
  handleRemove: PropTypes.func,
};

Task.defaultProps = {
  handleMarkDone: () => {},
  handleRemove: () => {},
};

export default Task;
