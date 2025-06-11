import axios from "axios";

const apiServer = axios.create({
  baseURL: "http://localhost:4201/api",
  withCredentials: true,
});

export default apiServer;
