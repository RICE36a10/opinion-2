import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/user";
import { UserState } from "@/types/user";
const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("accessToken");
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.user = null;
      state.error = payload as string;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
