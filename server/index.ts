import axios from "axios";
// console.log(`ENV: ${process.env.NEXT_PUBLIC_API_URL}`);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
