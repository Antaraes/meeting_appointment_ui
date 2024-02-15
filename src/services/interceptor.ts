import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_HOST}`,
  // withCredentials: true,
});

export default API;
