import firebase from 'firebase/app';  //install firebase package first
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {     // Your web app's Firebase configuration
  apiKey: "AIzaSyCblkUAC11dfwjhDjiZUhCcf-o1tPMFaTU",
  authDomain: "typing-app-b2db8.firebaseapp.com",
  projectId: "typing-app-b2db8",
  storageBucket: "typing-app-b2db8.firebasestorage.app",
  messagingSenderId: "365843461262",
  appId: "1:365843461262:web:abecd58f1f8168eaa185df",
  measurementId: "G-Z8HJ9NCDWX"
};

firebase.initializeApp(firebaseConfig);   // Initialize Firebase

const auth = firebase.auth();        //exporting auth and firestore to use in other files
const db = firebase.firestore();  //exporting firestore to use in other files
export {auth, db};