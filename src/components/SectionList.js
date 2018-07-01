import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

class SectionList extends Component {
  render() {
    return (
      <ul className="list">
        {Object.entries(this.props.sections).map(item => (
          <li key={item[0]}>{item[1].name}</li>
        ))}
      </ul>
    );
  }
}

SectionList.propTypes = {
  sections: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SectionList;
