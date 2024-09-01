import axios from "axios";
import { BASE_URL } from "../utils/constants/baseUrl";
const apiConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const AXIOS = axios.create(apiConfig);
