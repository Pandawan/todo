import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultText };
    this.submitForm = this.submitForm.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleSubmit(this.state.text);
    this.setState({ text: this.props.defaultText });
  }

  changeInput(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label htmlFor="new-todo">
          What needs to be done?
          <input id="new-todo" onChange={this.changeInput} value={this.state.text} autoComplete="off" />
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

FormInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default FormInput;
