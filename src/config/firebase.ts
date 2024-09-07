import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyABNp4nr-iPTQRIj43oDZ0s6Jlg1ByNsog",
  authDomain: "product-feedback-app-60541.firebaseapp.com",
  projectId: "product-feedback-app-60541",
  storageBucket: "product-feedback-app-60541.appspot.com",
  messagingSenderId: "398811701439",
  appId: "1:398811701439:web:324f4d80aa8d12bcf1e60a",
  measurementId: "G-WZSGERBQC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
