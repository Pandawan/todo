import firebase from '@firebase/app';
import '@firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyA4gfEI7TAyHtwFYVZ_VRt-KJ9h6Re8Kks',
  authDomain: 'todo-a13ca.firebaseapp.com',
  databaseURL: 'https://todo-a13ca.firebaseio.com',
  projectId: 'todo-a13ca',
  storageBucket: 'todo-a13ca.appspot.com',
  messagingSenderId: '607629250598',
});

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase.firestore().enablePersistence()
  .then(() => firebase.firestore())
  .catch((error) => {
    console.error(error);
    return firebase.firestore();
  });
