import axios from "axios";
import queryString from "query-string";
import { createCookie, getCookie } from "../helper/cookie";

const axiosClient = axios.create({
    baseURL: "/api",
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" })
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getCookie("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.retry) {
            // Token expired
            originalRequest.retry = true;
            const url = "/api/auth/token";
            const config = {
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`,
                    "Content-Type": "application/json",
                    "x-refresh-token": localStorage.getItem("refresh_token")
                }
            };

            try {
                const response = await axios.post(url, null, config);
                const accessToken = response.headers["x-access-token"];
                const refreshToken = response.headers["x-refresh-token"];
                createCookie("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                return axiosClient(originalRequest);
            } catch (err) {
                throw err;
            }
        } else {
            // Forbidden request
            // store.dispatch(setMessage(error.response.data));
            throw error;
        }
    }
);

export default axiosClient;
