import axios from "axios";
import { KEY_TOKEN } from "../constant/key";

const API_URL = "http://member-phone.somee.com/";
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const getLocalToken = localStorage.getItem(KEY_TOKEN);
    console.log(getLocalToken)
    if (getLocalToken) {
      config.headers.Authorization = `Bearer ${getLocalToken}`;
    }
    
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
