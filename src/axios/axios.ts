import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.kinopoisk.dev",
});
export const backend = axios.create({
  withCredentials: true,
  baseURL: "https://moo.herokuapp.com",
});

backend.interceptors.request.use((config : any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})