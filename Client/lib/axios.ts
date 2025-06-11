import axios from "axios";

const apiServer = axios.create({
  baseURL: "https://mock-clone-vx69.onrender.com/api",
  withCredentials: true,
});

export default apiServer;
