import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleSubmit();
  }

  changeInput(e) {
    this.props.handleChange(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label htmlFor="new-todo">
          What needs to be done?
          <input id="new-todo" onChange={this.changeInput} value={this.props.text} />
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

List.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default List;
