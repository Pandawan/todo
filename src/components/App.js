import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadSections, createSection } from '../actions/todo';

import SectionList from './SectionList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    this.props.loadSections('J8VnxLCTY7blXAiAjrTQ');
  }

  onSubmit(e) {
    e.preventDefault();
    const sectionName = this.state.text;
    this.props.createSection('J8VnxLCTY7blXAiAjrTQ', sectionName);
    this.setState({ text: '' });
  }

  onChangeText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <SectionList sections={this.props.sections} />
        <form onSubmit={this.onSubmit}>
          <input value={this.state.text} onChange={this.onChangeText} />
          <button type="submit">Add new section</button>
        </form>
      </div>
    );
  }
}

App.propTypes = {
  sections: PropTypes.objectOf(PropTypes.object),
  loadSections: PropTypes.func,
  createSection: PropTypes.func,
};

App.defaultProps = {
  sections: {},
  loadSections: () => {},
  createSection: () => {},
};

const mapStateToProps = state => ({
  sections: state.todo.sections,
});

export default connect(mapStateToProps, { loadSections, createSection })(App);
