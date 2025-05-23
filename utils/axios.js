import axios from "axios";
import { LOCAL_PRIVATE_TOKEN } from "./const";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    Authorization:
      typeof window !== "undefined"
        ? `Bearer ${localStorage.getItem(LOCAL_PRIVATE_TOKEN)}`
        : "", 
  },
});
