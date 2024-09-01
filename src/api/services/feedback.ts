import { AXIOS } from "../axios";

export const getAllFeedbacks = async () => {
  return AXIOS.get(`/product-requests`);
};
