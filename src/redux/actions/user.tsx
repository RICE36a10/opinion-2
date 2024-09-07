import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, googleProvider } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

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
