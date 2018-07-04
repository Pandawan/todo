import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormInput.css';

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
    // Make sure it's not just empty text
    if (this.state.text.trim()) {
      this.props.handleSubmit(this.state.text);
      this.setState({ text: this.props.defaultText });
    }
  }

  changeInput(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="form-container container">
        <form className="form-main" onSubmit={this.submitForm}>
          <div className="form-body">
            <div className="form-content">
              <input id="new-task" className="form-input" onChange={this.changeInput} value={this.state.text} autoComplete="off" placeholder="What needs to be done?" />
            </div>
            <button className="form-add" type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

FormInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default FormInput;
