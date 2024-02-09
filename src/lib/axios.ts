import axios from "axios";

const BASE_URL = process.env.SERVER_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
