import axios from "axios";

const apiServer = axios.create({
  baseURL: "https://mocky-clone-server.onrender.com/api",
  withCredentials: true,
});

export default apiServer;
