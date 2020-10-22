// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCXUvSzxcCMHjNnfceNj8vitvEgAYtD2tk",
    authDomain: "whatsapp-11053.firebaseapp.com",
    databaseURL: "https://whatsapp-11053.firebaseio.com",
    projectId: "whatsapp-11053",
    storageBucket: "whatsapp-11053.appspot.com",
    messagingSenderId: "55687309922",
    appId: "1:55687309922:web:a3cb8800d64e39edc1ff3b",
    measurementId: "G-MEZZNWVTLJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider}
  export default db;