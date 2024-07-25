// "use client";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getHeaders = () => {
  if (window) {
    const token = window?.localStorage.getItem("user_token");
    console.log(token, "tokentokentoken");
    if (!token) {
      window?.localStorage.removeItem("user_token");
      return {
        "Content-Type": "application/json",
      };
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
};

const request = axios.create({
  baseURL: apiUrl,
  headers: getHeaders(),
});

export default request;
