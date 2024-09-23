import { createSlice } from "@reduxjs/toolkit";
import { getUser, logOutUser } from "../actions/user";
import { UserState } from "@/types/user";
import { authUser } from "@/types/user";
const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload as authUser;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.user = null;
      state.error = payload as string;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logOutUser.rejected, (state, { payload }) => {
      state.error = payload as string;
    });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
