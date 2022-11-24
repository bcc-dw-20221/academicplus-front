import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`
  }
});
