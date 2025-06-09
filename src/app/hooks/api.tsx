import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const baseURL = "http://localhost:8080";

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor to handle response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);
