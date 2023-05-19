import axios from "axios";

const api = axios.create({
  baseURL: "https://ouna-backend.vercel.app",
});

export default api;
