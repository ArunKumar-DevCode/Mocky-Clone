import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://mock-clone-vx69.onrender.com/api";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
