import axios from "axios";
// import { parseCookies } from "nookies";

// const cookies = parseCookies();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export default instance;
