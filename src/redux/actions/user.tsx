import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return rejectWithValue(err.response?.data || "Failed to fetch User");
        } else {
          return rejectWithValue("An unexpected error occurred");
        }
      }
    }
  }
);
