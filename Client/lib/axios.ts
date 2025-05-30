import axios, { AxiosInstance } from "axios";

const baseURL = "https://mock-clone-vx69.onrender.com/api";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
