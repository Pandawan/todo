import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

import sectionModel from './models/section';
import todoModel from './models/todo';

// Config
firebase.initializeApp({
  apiKey: 'AIzaSyA4gfEI7TAyHtwFYVZ_VRt-KJ9h6Re8Kks',
  authDomain: 'todo-a13ca.firebaseapp.com',
  databaseURL: 'https://todo-a13ca.firebaseio.com',
  projectId: 'todo-a13ca',
  storageBucket: 'todo-a13ca.appspot.com',
  messagingSenderId: '607629250598',
});

// Firestore Setup
firebase.firestore().settings({ timestampsInSnapshots: true });

// TODO: Add persistence/localStorage
const firestore = firebase.firestore();

const getSectionsDB = userId => new Promise((resolve, reject) => {
  firestore.collection('users').doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
      // Return all sections for that user
        resolve(doc.data().sections);
      } else {
        console.log(`No document found with id ${userId}!`);
        reject(new Error(`No document found with id ${userId}!`));
      }
    })
    .catch((error) => {
      console.log(`Error getting document ${userId}:`, error);
      reject(error);
    });
});

const getTodosDB = (userId, sectionId) => new Promise((resolve, reject) => {
  firestore.collection('users').doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
      // Return the all todos within the given section
        resolve(doc.data().sections.find(element => element.id === sectionId));
      } else {
        console.log(`No document found with id ${userId}!`);
        reject(new Error(`No document found with id ${userId}!`));
      }
    })
    .catch((error) => {
      console.log(`Error getting document ${userId}:`, error);
      reject(error);
    });
});

const addSection = (userId, name) => new Promise((resolve, reject) => {
  getSectionsDB(userId)
    .then((data) => {
      const sections = data;
      const key = Object.keys(sections).length;
      const model = sectionModel(key, name, firebase.firestore.FieldValue.serverTimestamp());
      sections[key] = model;
      firestore.collection('users').doc(userId).update({ sections })
        .then(resolve(key))
        .catch(error => reject(error));
    })
    .catch(error => reject(error));
});

const addTodo = (userId, sectionId, name) => new Promise((resolve, reject) => {
  getSectionsDB(userId)
    .then((data) => {
      const sections = data;
      const key = Object.keys(sections[sectionId].todos).length;
      const model = todoModel(key, name, firebase.firestore.FieldValue.serverTimestamp());
      sections[sectionId].todos[key] = model;
      firestore.collection('users').doc(userId).update({ sections })
        .then(resolve(key))
        .catch(error => reject(error));
    })
    .catch(error => reject(error));
});

// Auth Setup
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;

export {
  firestore,
  auth,
  provider,
  getSectionsDB,
  addSection,
  getTodosDB,
  addTodo,
};
