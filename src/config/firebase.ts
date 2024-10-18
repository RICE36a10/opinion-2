import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgED77lGKmrcPU4weXcjGVuzpoYHAM9Yg",
  authDomain: "opinionoasisnsut.firebaseapp.com",
  projectId: "opinionoasisnsut",
  storageBucket: "opinionoasisnsut.appspot.com",
  messagingSenderId: "752138777235",
  appId: "1:752138777235:web:aa8abb221f2148ea40d366",
  measurementId: "G-EK44W4XTH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
