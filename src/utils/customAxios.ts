import axios, { AxiosRequestConfig } from "axios";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

customAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = window.localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }
  if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default customAxios;
