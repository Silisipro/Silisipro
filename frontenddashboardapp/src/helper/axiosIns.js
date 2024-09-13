import axios from 'axios';
import { API_BASE_URL } from "../constants/ApiConstant";

import store  from '../store/store';  

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});


axiosInstance.interceptors.request.use(
  (config) => {
    const stateh = store.getState();
  
    const userToken = stateh.authentique.deToken;
    const token = userToken
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

