import { AXIOS } from "../axios";
import { BASE_URL } from "../../utils/constants/baseUrl";

export const getAllFeedbacks = async () => {
  return AXIOS.get(`${BASE_URL}/product-requests`);
};
