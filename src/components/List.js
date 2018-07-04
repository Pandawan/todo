import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

class List extends Component {
  render() {
    const taskIds = Object.keys(this.props.items);
    return (
      <ul className="task-list container">
        {taskIds.map((taskId) => {
          const item = this.props.items[taskId];
          return (
            <Task
              key={taskId}
              item={item}
              handleMarkDone={(done) => { this.props.handleMarkDone(taskId, done); }}
              handleRemove={() => { this.props.handleRemove(taskId); }}
            />
          );
        })}
      </ul>
    );
  }
}

List.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  items: PropTypes.object.isRequired,
  handleMarkDone: PropTypes.func,
  handleRemove: PropTypes.func,
};

List.defaultProps = {
  handleMarkDone: () => {},
  handleRemove: () => {},
};

export default List;
