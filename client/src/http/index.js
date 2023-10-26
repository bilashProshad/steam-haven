import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
