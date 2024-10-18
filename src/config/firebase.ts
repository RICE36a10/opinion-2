import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCrXyShvgRR8bV-HZY1XRWFC4yS6--sLkc",
  authDomain: "opinion2-5ff6e.firebaseapp.com",
  projectId: "opinion2-5ff6e",
  storageBucket: "opinion2-5ff6e.appspot.com",
  messagingSenderId: "848059314753",
  appId: "1:848059314753:web:e9887a670598e2042f0cc0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
