import { createSlice } from "@reduxjs/toolkit";
import { sortByOrder } from "@/types/request";
import { FilterState } from "@/types/request";
const initialState: FilterState = {
  sortBy: { name: "Most Upvotes", id: sortByOrder.DESC_UPVOTES },
  filterByCategory: "all",
};
const filterSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterByCategory: (state, action) => {
      state.filterByCategory = action.payload;
    },
  },
});

export const { setSortBy, setFilterByCategory } = filterSlice.actions;
export default filterSlice.reducer;
