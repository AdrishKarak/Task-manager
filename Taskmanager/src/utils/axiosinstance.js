import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle errors globally
        if (error.response.status === 401) {
            //Redirect to ,ogin page
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Internal Server Error");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request Timeout");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
