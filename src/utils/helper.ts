import { sortByOrder, Request } from "@/types/request";

export const sortFeedbacks = (
  feedbacks: Request[],
  sortBy: sortByOrder,
  category: string
) => {
  const filteredFeedbacks =
    category === "all"
      ? feedbacks
      : feedbacks.filter((feedback) => feedback.category === category);
  switch (sortBy) {
    case sortByOrder.DESC_UPVOTES:
      return [...filteredFeedbacks].sort((a, b) => b.upvotes - a.upvotes);
    case sortByOrder.ASC_UPVOTES:
      return [...filteredFeedbacks].sort((a, b) => a.upvotes - b.upvotes);
    case sortByOrder.DESC_COMMENTS:
      return [...filteredFeedbacks].sort(
        (a, b) => b.commentCount - a.commentCount
      );
    case sortByOrder.ASC_COMMENTS:
      return [...filteredFeedbacks].sort(
        (a, b) => a.commentCount - b.commentCount
      );
    default:
      return filteredFeedbacks;
  }
};
export const editUserEmail = (email: string) => {
  return email.slice(0, email.indexOf("@"));
};
