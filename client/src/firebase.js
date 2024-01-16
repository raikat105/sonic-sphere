// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "sonic-sphere.firebaseapp.com",
  projectId: "sonic-sphere",
  storageBucket: "sonic-sphere.appspot.com",
  messagingSenderId: "874470239193",
  appId: "1:874470239193:web:6439466bc8c845e5a6c7c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);