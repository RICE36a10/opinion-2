import { AXIOS } from "../axios";

export const getAllFeedbacks = async () => {
  return AXIOS.get(`/product-requests`);
};
export const updateProductUpvote = async (...args: unknown[]) => {
  const [productId, upvote, hasUserUpvote] = args as [string, boolean, boolean];
  return AXIOS.patch(`/product-requests/${productId}/upvote`, {
    upvote,
    hasUserUpvote,
  });
};
