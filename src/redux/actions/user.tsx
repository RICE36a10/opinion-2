import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, googleProvider } from "@/config/firebase";
import { signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../slices/userSlice";
import { authUser } from "@/types/user";
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      await signInWithPopup(auth, googleProvider);
      return auth.currentUser!.providerData[0];
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Failed to fetch User");
      } else {
        return err;
      }
    }
  }
);
export const listenToAuthState = createAsyncThunk(
  "user/listenToAuthState",
  async (_, { dispatch }) => {
    return new Promise<authUser | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.providerData[0]);
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Failed to log out User");
      } else {
        return err;
      }
    }
  }
);
