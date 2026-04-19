import axios from "axios";
import UseAuth from "./UseAuth";
import { useMemo } from "react";

export default function UseAxios() {
  const { user } = UseAuth();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    // request interceptor
    instance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;

        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [user?.accessToken]);

  return axiosSecure;
}