import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "@/types/request";
const initialState = {
  comments: [] as Comment[],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;
