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

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: getHeaders(),
});

// make sure has token after login
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
