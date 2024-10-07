import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "@/config/firebase";
import { signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../slices/userSlice";
import { authUser } from "@/types/user";
import { FirebaseError } from "firebase/app";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      await signInWithPopup(auth, googleProvider);
      return auth.currentUser!.providerData[0];
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError.message);
    }
  }
);
export const listenToAuthState = createAsyncThunk(
  "user/listenToAuthState",
  async (_, { dispatch }) => {
    return new Promise<authUser | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.providerData[0]));
        } else {
          dispatch(setUser(null));
        }
        resolve(user ? user.providerData[0] : null);
      });
    });
  }
);
export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      signOut(auth);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError.message);
    }
  }
);
