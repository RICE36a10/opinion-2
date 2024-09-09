import { createSlice } from "@reduxjs/toolkit";
import { Request } from "@/types/request";
import { getFeedbacks } from "../actions/feedback";
import { FeedbackState } from "@/types/request";

const initialState: FeedbackState = {
  feedbackData: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFeedbacks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFeedbacks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.feedbackData = payload as Request[];
    });
    builder.addCase(getFeedbacks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export default feedbackSlice.reducer;
