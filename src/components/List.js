import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    return (
      <ul className="list">
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
