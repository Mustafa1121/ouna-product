import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-54-204-116-184.compute-1.amazonaws.com:3096",
});

export default api;
