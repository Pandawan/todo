import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

class Task extends Component {
  render() {
    return (
      <li className="todo-item">
        <p className={this.props.item.done ? 'todo-name todo-done' : 'todo-name'}>{this.props.item.name}</p>
        { this.props.item.done
          ? <button type="button" className="todo-remove-button" onClick={this.props.handleRemove}>Remove</button>
          : <button type="button" className="todo-done-button" onClick={this.props.handleMarkDone}>Done</button>
        }
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
