import axios from "axios";
import queryString from "query-string";
import { getCookie } from "../helper/cookie";

const axiosClient = axios.create({
    baseURL: "/api",
    paramsSerializer: (params) =>
        queryString.stringify(params, { arrayFormat: "comma" }),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
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
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
