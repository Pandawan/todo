import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

class List extends Component {
  render() {
    const todosIds = Object.keys(this.props.items);
    return (
      <ul className="list">
        {todosIds.map((todoId) => {
          const item = this.props.items[todoId];
          return (
            <Task
              key={todoId}
              item={item}
              handleMarkDone={() => { this.props.handleMarkDone(todoId); }}
              handleRemove={() => { this.props.handleRemove(todoId); }}
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
