import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAnZoU0S9VcQNqtlP0Eo-oFfYD9Q2jg1RE",
  authDomain: "original-opinion-1.firebaseapp.com",
  projectId: "original-opinion-1",
  storageBucket: "original-opinion-1.appspot.com",
  messagingSenderId: "439916396436",
  appId: "1:439916396436:web:df16ede09e526540af5981",
  measurementId: "G-N4PGR1V4GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
