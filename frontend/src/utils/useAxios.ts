import axios, { AxiosInstance } from "axios";

const BASE_URL: string = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
