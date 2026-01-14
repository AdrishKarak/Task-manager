import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    // ❌ DO NOT set Content-Type globally
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        } else if (error.response?.status === 500) {
            console.error("Internal Server Error");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request Timeout");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
