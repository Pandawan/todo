import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import List from './List';
import FormInput from './FormInput';
import { firebase, firestore } from '../firebase';

import './ToDo.css';

class ToDo extends Component {
  static dbError(error) {
    if (error) {
      alert('Oops, technical difficulties. Try again in a minute.');
      console.error(error);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId') || '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || {},
    };
    firestore.then((db) => { this.db = db; });

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onAddOrUpdateTask = this.onAddOrUpdateTask.bind(this);
    this.onRemoveTask = this.onRemoveTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // On SignIn
  onSignIn(userId) {
    localStorage.clear();
    localStorage.setItem('userId', userId);
    this.setState({ userId });
    this.getTasks(userId);
  }

  // On SignOut
  onSignOut() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    localStorage.clear();
    this.setState({ userId: '', tasks: {} });
  }

  // Whenever there is an add or update operation, change tasks object
  onAddOrUpdateTask(snapshot) {
    this.setState(state => ({
      tasks: {
        ...state.tasks,
        [snapshot.id]: snapshot.data(),
      },
    }), () => localStorage.setItem('tasks', JSON.stringify(this.state.tasks)));
  }

  // Whenever there is a remove operation, change tasks object
  onRemoveTask(snapshot) {
    this.setState((state) => {
      const tasks = { ...state.tasks };
      delete tasks[snapshot.id];
      return { tasks };
    }, () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    });
  }

  // Start fetching/updating database (create connection that remains open)
  getTasks(userId, attempt = 1) {
    if (!this.db) {
      setTimeout(() => this.getTasks(userId, attempt + 1), 1000 * attempt);
      return;
    }

    this.unsubscribe = this.db.collection(`users/${userId}/tasks`)
      .orderBy('created')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') return this.onAddOrUpdateTask(change.doc);
          if (change.type === 'modified') return this.onAddOrUpdateTask(change.doc);
          if (change.type === 'removed') return this.onRemoveTask(change.doc);
          return null;
        });
      });
  }

  handleMarkDone(taskId, done) {
    this.db.collection(`users/${this.state.userId}/tasks`).doc(taskId).update({ done })
      .catch(ToDo.dbError);
  }

  handleRemove(taskId) {
    this.db.collection(`users/${this.state.userId}/tasks`).doc(taskId).delete()
      .catch(ToDo.dbError);
  }

  // When the user submits a new item through form
  handleAddTask(text) {
    if (this.state.userId && this.db) {
      const value = {
        name: text,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      };
      // Update on firestore
      this.db.collection(`users/${this.state.userId}/tasks`).add(value).catch(ToDo.dbError);
    } else {
      ToDo.dbError(new Error(`Could not find ${this.state.userId ? '' : 'userId, '}${this.db ? '' : 'db,'} please try again.`));
    }
  }

  render() {
    return (
      <div className="todo bot-line">
        <div className="header">
          <div className="header-content container">
            <div className="header-title">
              <h1>Hello{this.props.user ? `, ${this.props.user.displayName}` : ''}</h1>
              <h3>{ moment().format('dddd, MMMM D') }</h3>
            </div>
          </div>
        </div>
        <List
          items={this.state.tasks}
          handleMarkDone={this.handleMarkDone}
          handleRemove={this.handleRemove}
        />
        <FormInput defaultText="" handleSubmit={this.handleAddTask} />
      </div>
    );
  }
}

ToDo.propTypes = {
  user: PropTypes.shape({ displayName: PropTypes.string }).isRequired,
};

export default ToDo;
