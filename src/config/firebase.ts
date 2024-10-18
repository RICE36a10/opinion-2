import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbk8D0bA2lArqawxxFPDbvGr0qadPY-Zk",
  authDomain: "proproty-d3096.firebaseapp.com",
  projectId: "proproty-d3096",
  storageBucket: "proproty-d3096.appspot.com",
  messagingSenderId: "716013078825",
  appId: "1:716013078825:web:49db2049efc8fcbb638f38",
  measurementId: "G-S3CPQSH31N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
