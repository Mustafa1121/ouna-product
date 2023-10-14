import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ouna.app:3306/",
});

export default api;
