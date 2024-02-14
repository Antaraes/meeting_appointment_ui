import axios from "axios";

const API = axios.create({
  // baseURL: `http://localhost:${process.env.SERVER_PORT}/api/v1`,
  baseURL: `http://localhost:4000/api/v1`,
  withCredentials: true,
});

//console.log("Base URL:", API.defaults.baseURL);

export default API;
