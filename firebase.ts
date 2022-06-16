// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo8vHIqIURrNpQDsfjoqNS37u8CrkhqFY",
  authDomain: "netflix-clone-ebd1d.firebaseapp.com",
  projectId: "netflix-clone-ebd1d",
  storageBucket: "netflix-clone-ebd1d.appspot.com",
  messagingSenderId: "561231837500",
  appId: "1:561231837500:web:6dfbb3ad6788b7c0318639",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
export default app;

export { auth, db };
