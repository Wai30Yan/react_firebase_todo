// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkq-TTCwyR9DdvLtPUn3tZ51w7XOfzjeg",
  authDomain: "react-firebase-todo-996cb.firebaseapp.com",
  projectId: "react-firebase-todo-996cb",
  storageBucket: "react-firebase-todo-996cb.appspot.com",
  messagingSenderId: "799928147992",
  appId: "1:799928147992:web:7ef0d85ca41fdf2824a36d",
  measurementId: "G-YJ0E40EWZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)