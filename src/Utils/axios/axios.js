import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8081/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8081/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});
