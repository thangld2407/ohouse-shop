import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;

const token = localStorage.getItem("access_token");

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

export { service };
