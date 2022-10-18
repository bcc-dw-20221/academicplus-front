import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`
  }
});

export { instanceAxios };
