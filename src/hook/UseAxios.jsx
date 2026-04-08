import axios from "axios";
import UseAuth from "./UseAuth";

export default function useAxios() {
  const { user } = UseAuth(); 

  // Axios instance
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}