// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArijY0ycRzDWE1b7WxDp30RW--jE1_QTg",
  authDomain: "reels-8dd67.firebaseapp.com",
  projectId: "reels-8dd67",
  storageBucket: "reels-8dd67.appspot.com",
  messagingSenderId: "585518569927",
  appId: "1:585518569927:web:15216ddc32baebd321a1e2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users: firestore.collection('users'),
    getTimeStamp: firebase.firestore.FieldValue.getTimeStamp
}

export const storage = firebase.storage();