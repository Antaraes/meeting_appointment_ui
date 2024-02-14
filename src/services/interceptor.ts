import axios from "axios";

const API = axios.create({
  baseURL: "http://10.1.40.184:8880/api/v1",
  withCredentials: true,
});

export default API;
