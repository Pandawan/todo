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

    this.getTodos = this.getTodos.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.submitTodoItem = this.submitTodoItem.bind(this);
    this.onAddOrUpdateTodo = this.onAddOrUpdateTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
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

  // On SignIn
  handleSignIn(userId) {
    localStorage.clear();
    localStorage.setItem('userId', userId);
    this.setState({ userId });
    this.getTodos(userId);
  }

  // On SignOut
  handleSignOut() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    localStorage.clear();
    this.setState({ userId: '', todos: {} });
  }

  // When the user submits a new item through form
  submitTodoItem(text) {
    if (this.state.userId && this.db) {
      // Create new todo item
      const key = Object.keys(this.state.todos).length;
      const value = {
        id: key,
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
    return (
      <div className="todo">
        <List items={Object.values(this.state.todos)} />
        <FormInput defaultText="" handleSubmit={this.submitTodoItem} />
      </div>
    );
  }
}

export default ToDo;
