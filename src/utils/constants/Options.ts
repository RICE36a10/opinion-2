import { sortOptions as SortOptionsType, sortByOrder } from "@/types/request";

export const sortOptions: SortOptionsType = [
  { name: "Most Upvotes", id: sortByOrder.DESC_UPVOTES },
  { name: "Least Upvotes", id: sortByOrder.ASC_UPVOTES },
  { name: "Most Comments", id: sortByOrder.DESC_COMMENTS },
  { name: "Least Comments", id: sortByOrder.ASC_COMMENTS },
];

export const categoryOptions = [
  {
    name: "Feature",
  },
  {
    name: "Enhancement",
  },

  {
    name: "UI",
  },
  {
    name: "UX",
  },
  {
    name: "Bug",
  },
];
export const statusOptions = [
  {
    name: "Suggestion",
  },
  {
    name: "Planned",
  },

  {
    name: "In-progress",
  },
  {
    name: "Live",
  },
];
