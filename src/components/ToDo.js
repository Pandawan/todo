import React, { Component } from 'react';
import List from './List';
import FormInput from './FormInput';
import { firebase, firestore } from '../firebase';

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
      todos: JSON.parse(localStorage.getItem('todos')) || {},
    };
    firestore.then((db) => { this.db = db; });

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onAddOrUpdateTodo = this.onAddOrUpdateTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
    this.submitTodoItem = this.submitTodoItem.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // On SignIn
  onSignIn(userId) {
    localStorage.clear();
    localStorage.setItem('userId', userId);
    this.setState({ userId });
    this.getTodos(userId);
  }

  // On SignOut
  onSignOut() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    localStorage.clear();
    this.setState({ userId: '', todos: {} });
  }

  // Whenever there is an add or update operation, change todos object
  onAddOrUpdateTodo(snapshot) {
    this.setState(state => ({
      todos: {
        ...state.todos,
        [snapshot.id]: snapshot.data(),
      },
    }), () => localStorage.setItem('todos', JSON.stringify(this.state.todos)));
  }

  // Whenever there is a remove operation, change todos object
  onRemoveTodo(snapshot) {
    this.setState((state) => {
      const todos = { ...state.todos };
      delete todos[snapshot.id];
      return { todos };
    }, () => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    });
  }

  // Start fetching/updating database (create connection that remains open)
  getTodos(userId, attempt = 1) {
    if (!this.db) {
      setTimeout(() => this.getTodos(userId, attempt + 1), 1000 * attempt);
      return;
    }

    this.unsubscribe = this.db.collection(`users/${userId}/todos`)
      .orderBy('created')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') return this.onAddOrUpdateTodo(change.doc);
          if (change.type === 'modified') return this.onAddOrUpdateTodo(change.doc);
          if (change.type === 'removed') return this.onRemoveTodo(change.doc);
          return null;
        });
      });
  }

  handleMarkDone(todoId) {
    this.db.collection(`users/${this.state.userId}/todos`).doc(todoId).update({ done: true })
      .catch(this.dbError);
  }

  handleRemove(todoId) {
    this.db.collection(`users/${this.state.userId}/todos`).doc(todoId).delete()
      .catch(this.dbError);
  }

  // When the user submits a new item through form
  submitTodoItem(text) {
    if (this.state.userId && this.db) {
      const value = {
        name: text,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      };
      // Update on firestore
      this.db.collection(`users/${this.state.userId}/todos`).add(value).catch(this.dbError);
    } else {
      this.dbError(new Error(`Could not find ${this.state.userId ? '' : 'userId, '}${this.db ? '' : 'db,'} please try again.`));
    }
  }

  render() {
    // If it hasn't loaded yet.
    if (!this.db || !this.state.userId) {
      return (
        <div className="todo">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="todo">
        <List
          items={this.state.todos}
          handleMarkDone={this.handleMarkDone}
          handleRemove={this.handleRemove}
        />
        <FormInput defaultText="" handleSubmit={this.submitTodoItem} />
      </div>
    );
  }
}

export default ToDo;
