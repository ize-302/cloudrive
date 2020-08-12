import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj0n-YXu20BLA886rfQbASCOoQjY_WR-o",
  authDomain: "cloudrive-4ebeb.firebaseapp.com",
  databaseURL: "https://cloudrive-4ebeb.firebaseio.com",
  projectId: "cloudrive-4ebeb",
  storageBucket: "cloudrive-4ebeb.appspot.com",
  messagingSenderId: "230517616137",
  appId: "1:230517616137:web:5a8e871dd7b3ff5cc292d8",
  measurementId: "G-09PBMD8MZ4",
};

// Initialize
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
